import { Component } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [UserFormComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private router: Router) {
    router.events.subscribe(
      (event) => event instanceof NavigationEnd && this.isBulletin()
    );
  }

  isBulletin = () => {
    if (this.router.url.includes('bulletin')) {
      return true;
    }
    return false;
  };

  isCreate = () => {
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
    this.router.navigate(['/bulletin']);
  };

  goToCreate = () => {
    this.router.navigate(['/create']);
  };
}
