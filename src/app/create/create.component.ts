import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  createBulletin!: FormGroup;

  ngOnInit(): void {
    this.createBulletin = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      limit: new FormControl(50, [Validators.required, Validators.max(1000)]),
      time: new FormControl(-1, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.createBulletin.valid) {
      console.log(this.createBulletin.value); // handle form submission
    }
  }

  resetForm() {
    this.createBulletin.reset(); // resets all controls
  }
}
