import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { AboutComponent } from './about/about.component';
import { CreateComponent } from './create/create.component';
import { JoinBulletinComponent } from './join-bulletin/join-bulletin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'bulletin/join', component: JoinBulletinComponent, title: 'Join Bulletin' },
  { path: 'bulletin/:id', component: BulletinComponent, title: 'Bulletin' },
  { path: 'create', component: CreateComponent, title: 'Create' },
];
