import { Component, Input } from '@angular/core';
import { BulletinManagerService } from '../bulletin-manager.service';
import { FormsModule } from '@angular/forms';
import Thing from '../../types/Thing';

@Component({
  selector: 'app-thing',
  imports: [FormsModule],
  templateUrl: './thing.component.html',
  styleUrl: './thing.component.css',
})
export class ThingComponent {

  constructor(private bulletinManagerService: BulletinManagerService) { }

  @Input() isAdding = false

  @Input() content = ''
  thingContent = ''

  @Input() id = ''

  @Input() likes = -1

  @Input() liked = false

  @Input() userId = -1

  @Input() currentUserId = -1

  ngOnChanges() {

    this.thingContent = this.content

  }

  get isOwner(): boolean {

    return this.userId == this.currentUserId

  }

  isEditing = false

  onLike = () => {

    // Call Bulletin Service To Create Like

  };

  onRemove = () => {

    if (this.isEditing) {

      this.isEditing = false
      this.thingContent = this.content
      return

    }

    // Call Bulletin Service To Delete

    this.bulletinManagerService.setIsAdding(false)

  };

  onEdit = () => {

    this.isEditing = true

  };

  onSubmit = () => {

    if (this.isEditing) {

      this.isEditing = false

      // Call Bulletin Service To Update Thing

      return

    }

    const editingThing: Thing = {

      content: this.thingContent,
      id: -1,
      bulletinId: -1,
      userId: -1,
      timeCreated: "",

    }

    // Call Bulletin Service To Add Thing

    this.bulletinManagerService.setIsAdding(false)

  }

}
