import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BulletinManagerService } from '../bulletin-manager.service';

@Component({
  selector: 'app-join-bulletin',
  imports: [ReactiveFormsModule],
  templateUrl: './join-bulletin.component.html',
  styleUrl: './join-bulletin.component.css'
})
export class JoinBulletinComponent {

  constructor(private bulletinManagerService: BulletinManagerService) { }

  joinForm = new FormGroup({

    joinCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),

  })

  onSubmit() {

    const joinCode = this.joinForm.value.joinCode

    if (!joinCode) {

      return

    }

    try {

      this.bulletinManagerService.joinBulletin(joinCode)

    } catch (err) {

      console.log(err)

    }

  }

}
