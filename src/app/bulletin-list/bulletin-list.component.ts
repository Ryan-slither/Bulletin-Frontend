import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bulletin-list',
  imports: [CommonModule],
  templateUrl: './bulletin-list.component.html',
  styleUrl: './bulletin-list.component.css'
})
export class BulletinListComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUserBulletins()

  }

}
