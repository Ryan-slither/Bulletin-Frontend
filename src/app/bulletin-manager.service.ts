import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import Bulletin from '../types/Bulletin';
import { WebSocketClient } from './websocket.service';
import Thing from '../types/Thing';

@Injectable({
  providedIn: 'root',
})
export class BulletinManagerService {

  private thingWSService: WebSocketClient | null = null

  constructor(private router: Router, private userService: UserService) { }

  private http = inject(HttpClient)

  private thingsSubject = new BehaviorSubject<Thing[] | null>(null);

  isAdding = false;

  getIsAdding = () => {

    return this.isAdding;

  };

  setIsAdding = (adding: boolean) => {

    this.isAdding = adding;

  };

  get things$(): Observable<Thing[] | null> {

    return this.thingsSubject.asObservable();

  };

  private setThings(things: Thing[] | null) {

    this.thingsSubject.next(things)

  }

  joinBulletin = (joinCode: string) => {

    this.http.post(environment.apiBaseUrl + "/api/v1/bulletin/join/" + joinCode, {}).subscribe({

      next: (response) => {

        this.router.navigate(["/bulletin/" + response])
        this.userService.getUserBulletins()

      },

      error: (err) => {

        console.log(err)

      }

    })

  }

  createBulletin = (title: string, limit: number) => {

    this.userService.user$.pipe(take(1)).subscribe(user => {

      this.http.post<Bulletin>(environment.apiBaseUrl + "/api/v1/bulletin", { title: title, memberLimit: limit, userId: user?.id }).subscribe({

        next: (response) => {

          this.userService.getUserBulletins()
          this.router.navigate(["/bulletin/" + response.id])

        },

        error: (err) => {

          console.error(err)

        }

      })

    })

  }

  getThingsByBulletin = (bulletinId: number) => {

    this.http.get<Thing[]>(environment.apiBaseUrl + "/api/v1/thing/things?bulletinId=" + bulletinId).subscribe({

      next: (response) => {

        this.setThings(response)

      },

      error: (err) => {

        console.error(err)

      }

    })

  }

  initializeThingWSService = (topic: string, url: string): void => {

    const initializeSubscription = this.userService.user$.subscribe(user => {

      if (!user) {

        return

      }

      this.thingWSService = new WebSocketClient(topic, url, this.onThingWSMessage, user?.token)
      initializeSubscription.unsubscribe()

    })

  }

  onThingWSMessage = (message: Thing): void => {

    this.things$.pipe(take(1)).subscribe(things => {

      const updatedThings = things?.filter(thing => thing.id != message.id)

      // Preserves Deletes
      if (message.bulletinId == null && message.userId == null) {

        return

      }

      if (updatedThings != null) {

        this.setThings([...updatedThings, message])

      } else {

        this.setThings([message])

      }

    })

  }

}
