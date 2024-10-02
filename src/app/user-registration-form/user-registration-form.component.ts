/**
 * @file user-registration-form.component.ts
 * @description This component handles the user registration form, allowing users to input their details and register an account.
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  // Used to close the registration dialog
import { FetchApiDataService } from '../fetch-api-data.service';  // API service for handling registration requests
import { MatSnackBar } from '@angular/material/snack-bar';  // Used to display notifications

/**
 * @class UserRegistrationFormComponent
 * @description Component for handling user registration functionality.
 */

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * @property {Object} userData - Object holding the registration details entered by the user.
   * @property {string} userData.Username - Username entered by the user.
   * @property {string} userData.Password - Password entered by the user.
   * @property {string} userData.Email - Email address entered by the user.
   * @property {string} userData.Birthday - Birthday entered by the user.
   */

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for making API calls related to user registration
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the registration dialog, used for closing it on success
   * @param {MatSnackBar} snackBar - Service to display snack bar notifications to the user
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs when the component is initialized.
   */

  ngOnInit(): void { }

  /**
   * @method registerUser
   * @description Sends the registration details to the backend and handles the response.
   *              If the registration is successful, the dialog is closed and a success message is shown.
   *              If the registration fails, an error message is displayed.
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (response) => {
        this.dialogRef.close();  // Close the registration dialog on successful registration
        this.snackBar.open('User registered successfully', 'OK', { duration: 2000 });  // Show success message
      },
      error: (error) => {
        console.log('Registration error:', error);  // Log any registration errors
        this.snackBar.open('Registration failed', 'OK', { duration: 2000 });  // Show error message
      }
    });
  }
}
