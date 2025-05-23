import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { AboutComponent } from './about/about.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'bulletin', component: BulletinComponent, title: 'Bulletin' },
  { path: 'create', component: CreateComponent, title: 'Create' },
];
