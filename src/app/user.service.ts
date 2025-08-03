import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core'; 21
import { environment } from '../environments/environment.dev';
import AuthResponse from '../types/AuthResponse';
import CreateUserResponse from '../types/CreateUserResponse';
import User from '../types/User';
import { BehaviorSubject, map, Observable } from 'rxjs';
import Bulletin from '../types/Bulletin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient)

  private userSubject = new BehaviorSubject<User | null>(null)

  private bulletinsSubject = new BehaviorSubject<Bulletin[] | null>(null)

  get user$(): Observable<User | null> {

    return this.userSubject.asObservable()

  }

  get isAuthenticated$(): Observable<boolean> {

    return this.user$.pipe(

      map(user => !!user)

    )

  }

  private setUser(user: User | null): void {

    this.userSubject.next(user)

  }

  get bulletins$(): Observable<Bulletin[] | null> {

    return this.bulletinsSubject.asObservable()

  }

  private setBulletins(bulletins: Bulletin[] | null): void {

    this.bulletinsSubject.next(bulletins)

  }

  async createUser(email: string, password: string): Promise<void> {

    const payload = {

      email: email,
      password: password

    }

    this.http.post<CreateUserResponse>(environment.apiBaseUrl + "/api/v1/users", payload).subscribe({

      next: (response) => {

        this.setUser({ ...response, token: "" })
        alert("Please verify your email by clicking the link sent to the address you used during sign-up. Once verified, you may log in to access the platform.")

      },

      error: (err) => {

        throw new Error("User Could Not Be Created: ", err)

      }

    })

  }

  async authenticateUser(email: string, password: string): Promise<void> {

    const payload = {

      email: email,
      password: password

    }

    this.http.post<AuthResponse>(environment.apiBaseUrl + "/api/v1/users/sign-in", payload).subscribe({

      next: (response) => {

        localStorage.setItem("authToken", response.token)

        this.setUser({

          id: response.id,
          timeCreated: response.timeCreated,
          token: response.token

        })

      },

      error: (err) => {

        console.log(err)
        this.createUser(email, password)

      }

    })

  }

  async reauthenticate(): Promise<void> {

    this.http.get<AuthResponse>(environment.apiBaseUrl + "/api/v1/users/reauthenticate").subscribe({

      next: (response) => {

        this.setUser({

          id: response.id,
          timeCreated: response.timeCreated,
          token: localStorage.getItem("authToken") ?? ""

        })

      },

      error: (err) => {

        if (err.status == 401) {

          this.logout()

        }

      }

    })

  }

  async getUserBulletins(): Promise<void> {

    this.http.get<Bulletin[]>(environment.apiBaseUrl + "/api/v1/bulletin?userId=" + this.userSubject.value?.id).subscribe({

      next: (response) => {

        const processedBulletinsDates = response.map(bulletin => ({
          ...bulletin,
          timeCreated: (new Date(parseInt(bulletin.timeCreated) * 1000)).toDateString()
        }))
        this.setBulletins(processedBulletinsDates)

        console.log(processedBulletinsDates)

      },

      error: (err) => {

        console.error(err)

      }

    })

  }

  logout(): void {

    if (typeof window === 'undefined') {

      return

    }

    localStorage.removeItem('authToken')
    this.setUser(null)

  }

}
