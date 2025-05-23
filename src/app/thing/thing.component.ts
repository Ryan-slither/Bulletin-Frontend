import { Component, Input } from '@angular/core';
import { BulletinManagerService, Thing } from '../bulletin-manager.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thing',
  imports: [FormsModule],
  templateUrl: './thing.component.html',
  styleUrl: './thing.component.css',
})
export class ThingComponent {
  constructor(private bulletinManagerService: BulletinManagerService) {}

  @Input() canEdit = false;

  @Input() canDelete = false;

  @Input() canApprove = false;

  @Input() isAdding = false;

  @Input() text = '';
  thingText = '';

  @Input() id = '';

  @Input() likes = -1;

  @Input() liked = false;

  ngOnChanges() {
    this.thingText = this.text;
  }

  isEditing = false;

  onLike = (thingId: string) => {
    if (this.liked) {
      if (!this.bulletinManagerService.unlikeThing(thingId)) {
        alert('Could Not Unlike Thing');
      }
    } else {
      if (!this.bulletinManagerService.likeThing(thingId)) {
        alert('Could Not Like Thing');
      }
    }
  };

  onRemove = (thingId: string) => {
    if (this.isEditing) {
      this.isEditing = false;
      this.thingText = this.text;
      return;
    }
    if (!this.bulletinManagerService.removeThing(thingId)) {
      alert('Could Not Remove Thing');
    }
    this.bulletinManagerService.setIsAdding(false);
  };

  onEdit = () => {
    this.isEditing = true;
  };

  onSubmit = (thingText: string) => {
    if (this.isEditing) {
      this.isEditing = false;
      if (!this.bulletinManagerService.editThing(this.id, thingText)) {
        alert('Could Not Add Thing');
      }
      return;
    }
    const newThing: Thing = {
      text: thingText,
      id: 'adding',
      canEdit: true,
      canDelete: true,
      likes: 0,
      liked: false,
    };
    if (!this.bulletinManagerService.addThing(newThing)) {
      alert('Could Not Add Thing');
    }
    this.bulletinManagerService.setIsAdding(false);
  };
}
