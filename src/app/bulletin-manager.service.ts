import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Thing {
  id: string;
  canEdit: boolean;
  canDelete: boolean;
  text: string;
  likes: number;
  liked: boolean;
}

const mockThings: Thing[] = [
  {
    id: '1',
    canEdit: true,
    canDelete: true,
    text: 'First item - editable and deletable only',
    likes: 0,
    liked: false,
  },
  {
    id: '2',
    canEdit: false,
    canDelete: true,
    text: 'Second item - can delete and approve',
    likes: 10,
    liked: true,
  },
  {
    id: '3',
    canEdit: true,
    canDelete: false,
    text: 'Third item - can edit and approve',
    likes: 50,
    liked: false,
  },
  {
    id: '4',
    canEdit: false,
    canDelete: false,
    text: 'Fourth item - view only',
    likes: 100,
    liked: false,
  },
  {
    id: '5',
    canEdit: true,
    canDelete: true,
    text: 'Fifth item - full permissions',
    likes: 500,
    liked: true,
  },
];

@Injectable({
  providedIn: 'root',
})
export class BulletinManagerService {
  constructor() {}

  private thingsSubject = new BehaviorSubject<Thing[]>(mockThings);
  things$ = this.thingsSubject.asObservable();

  isAdding = false;

  getIsAdding = () => {
    return this.isAdding;
  };

  setIsAdding = (adding: boolean) => {
    this.isAdding = adding;
  };

  getThings = () => {
    return this.thingsSubject.getValue();
  };

  likeThing = (thingId: string) => {
    const newThings = this.getThings().map((thing) => {
      if (thing.id === thingId && thing.liked === false) {
        thing.likes = thing.likes + 1;
        thing.liked = true;
      }
      return thing;
    });
    this.thingsSubject.next(newThings);
    return true;
  };

  unlikeThing = (thingId: string) => {
    const newThings = this.getThings().map((thing) => {
      if (thing.id === thingId && thing.liked === true) {
        thing.likes = thing.likes - 1;
        thing.liked = false;
      }
      return thing;
    });
    this.thingsSubject.next(newThings);
    return true;
  };

  addThing = (thing: Thing) => {
    const newThings = [...this.getThings(), thing];
    this.thingsSubject.next(newThings);
    return true;
  };

  editThing = (thingId: string, thingText: string) => {
    const newThings = this.getThings().map((thing) => {
      if (thing.id === thingId) {
        thing.text = thingText;
      }
      return thing;
    });
    this.thingsSubject.next(newThings);
    return true;
  };

  removeThing = (thingId: string) => {
    const newThings = this.getThings().filter((thing) => thing.id !== thingId);
    this.thingsSubject.next(newThings);
    return true;
  };
}
