import { BulletinManagerService } from './../bulletin-manager.service';
import { Component, OnInit } from '@angular/core';
import { ThingComponent } from '../thing/thing.component';
import { UserService } from '../user.service';
import { map, Subscription, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Bulletin from '../../types/Bulletin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bulletin',
  imports: [ThingComponent, CommonModule],
  providers: [BulletinManagerService],
  templateUrl: './bulletin.component.html',
  styleUrl: './bulletin.component.css',
})
export class BulletinComponent implements OnInit {

  constructor(
    public bulletinManagerService: BulletinManagerService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  private id: number | null = null

  public userId: number | null = null

  currentBulletin: Bulletin | undefined

  private bulletinSubscription: Subscription | null = null

  ngOnInit(): void {

    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? "")

    const userIdSubscription = this.userService.user$.subscribe(user => {

      if (user) {

        this.userId = user?.id
        userIdSubscription.unsubscribe()

      } else {

        return

      }

    })

    this.bulletinSubscription = this.userService.bulletins$.subscribe(bulletins => {

      bulletins?.find(bulletin => {

        if (bulletin.id == this.id) {

          this.currentBulletin = bulletin

          this.bulletinSubscription?.unsubscribe()

        }

      })

    })

    this.bulletinManagerService.getThingsByBulletin(this.id)

    this.bulletinManagerService.initializeThingWSService("/topic/" + this.id, "ws://localhost:8080/ws/thing")

  }

  get isAdding(): boolean {

    return this.bulletinManagerService.isAdding

  }

  onAdd = () => {

    this.bulletinManagerService.setIsAdding(true)

  }

}
