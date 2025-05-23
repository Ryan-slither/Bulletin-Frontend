import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {
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

  goToCreate = () => {
    this.router.navigate(['/create']);
  };
}
