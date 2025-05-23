import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BulletinManagerService } from './bulletin-manager.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  providers: [BulletinManagerService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'Bulletin';
}
