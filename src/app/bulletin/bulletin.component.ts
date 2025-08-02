import { BulletinManagerService, Thing } from './../bulletin-manager.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThingComponent } from '../thing/thing.component';
import { UserService } from '../user.service';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Bulletin from '../../types/Bulletin';

@Component({
  selector: 'app-bulletin',
  imports: [ThingComponent],
  providers: [BulletinManagerService],
  templateUrl: './bulletin.component.html',
  styleUrl: './bulletin.component.css',
})
export class BulletinComponent implements OnInit {

  constructor(
    private bulletinManagerService: BulletinManagerService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  private id: number | null = null

  currentBulletin: Bulletin | undefined

  private bulletinSubscription: Subscription | null = null

  ngOnInit(): void {

    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? "")

    this.bulletinSubscription = this.userService.bulletins$.subscribe(bulletins => {

      bulletins?.find(bulletin => {

        if (bulletin.id == this.id) {

          this.currentBulletin = bulletin

          this.bulletinSubscription?.unsubscribe()

        }

      })

    })

  }

  get isAdding(): boolean {

    return this.bulletinManagerService.isAdding

  }

  onAdd = () => {

    this.bulletinManagerService.setIsAdding(true)

  }

}
