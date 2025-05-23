import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  user = {
    email: '',
    password: '',
  };

  onSubmit() {
    console.log('Email: ', this.user.email, 'Password: ', this.user.password);
  }
}
