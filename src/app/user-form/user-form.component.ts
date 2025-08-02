import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {

  constructor(private userService: UserService) { }

  userForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),

  })

  async onSubmit() {

    const userFormValues = this.userForm.value

    try {

      if (userFormValues.email != null && userFormValues.password != null) {

        await this.userService.authenticateUser(userFormValues.email, userFormValues.password)

      } else {

        alert("User email and password are invalid.")

      }

    } catch (errSignIn) {

      alert("Could not be signed in at this time.")
      console.log(errSignIn)

    }

  }

}
