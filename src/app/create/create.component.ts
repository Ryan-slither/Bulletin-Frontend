import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BulletinManagerService } from '../bulletin-manager.service';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {

  constructor(private bulletinService: BulletinManagerService) { }

  createBulletin!: FormGroup;

  ngOnInit(): void {

    this.createBulletin = new FormGroup({

      title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      limit: new FormControl(50, [Validators.required, Validators.max(1000)]),

    });

  }

  onSubmit() {

    if (this.createBulletin.valid) {

      const bulletinValues = this.createBulletin.value

      this.bulletinService.createBulletin(bulletinValues.title, bulletinValues.limit)

    }

  }

  resetForm() {

    this.createBulletin.reset(); // resets all controls

  }

}
