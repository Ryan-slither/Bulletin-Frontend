import { BulletinManagerService, Thing } from './../bulletin-manager.service';
import { Component, Input } from '@angular/core';
import { ThingComponent } from '../thing/thing.component';

@Component({
  selector: 'app-bulletin',
  imports: [ThingComponent],
  providers: [BulletinManagerService],
  templateUrl: './bulletin.component.html',
  styleUrl: './bulletin.component.css',
})
export class BulletinComponent {
  constructor(private bulletinManagerService: BulletinManagerService) {}

  @Input() bulletinName: string = 'Sample Name';

  get isAdding(): boolean {
    return this.bulletinManagerService.isAdding;
  }

  get things(): Thing[] {
    return this.bulletinManagerService.getThings();
  }

  onAdd = () => {
    this.bulletinManagerService.setIsAdding(true);
  };
}
