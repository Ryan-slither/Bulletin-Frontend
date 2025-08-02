import { Component } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../user.service';
import { BulletinListComponent } from '../bulletin-list/bulletin-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [UserFormComponent, BulletinListComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  constructor(private router: Router, public userService: UserService) {

    router.events.subscribe(
      (event) => event instanceof NavigationEnd && this.isBulletin()
    );

  }

  isBulletin = (): boolean => {

    if (this.router.url.includes('bulletin')) {

      return true;

    }

    return false;

  };

  isCreate = (): boolean => {

    if (this.router.url.includes('create')) {

      return true;

    }

    return false;

  };

  goToHome = () => {

    this.router.navigate(['/']);

  };

  goToAbout = () => {

    this.router.navigate(['/about']);

  };

  goToBulletin = () => {

    this.router.navigate(['/bulletin/join']);

  };

  goToCreate = () => {

    this.router.navigate(['/create']);

  };

  logout = () => {

    this.userService.logout()

  }

}
