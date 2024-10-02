/**
 * @file user-login-form.component.ts
 * @description This component handles the user login form, allowing users to input their credentials and log into the application.
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  // Used to close the login dialog
import { FetchApiDataService } from '../fetch-api-data.service';  // API service for handling login requests
import { MatSnackBar } from '@angular/material/snack-bar';  // Used to display notifications
import { Router } from '@angular/router';

/**
 * @class UserLoginFormComponent
 * @description Component for handling user login functionality.
 */

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * @property {Object} userData - Object holding the login credentials entered by the user.
   * @property {string} userData.Username - Username entered by the user.
   * @property {string} userData.Password - Password entered by the user.
   */

  @Input() userData = { Username: '', Password: ''};

  /**
   * @constructor
   * @param {Router} router - Angular router for navigation
   * @param {FetchApiDataService} fetchApiData - Service for making API calls related to user login
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the login dialog, used for closing it on success
   * @param {MatSnackBar} snackBar - Service to display snack bar notifications to the user
   */

  constructor(
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }
   
  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs when the component is initialized.
   */

  ngOnInit(): void { }

  /**
   * @method userLogin
   * @description Sends the login credentials to the backend, handles the response, and manages the login process.
   *              If the login is successful, user data is saved to local storage, the dialog is closed, and the user is navigated to the movies page.
   *              If the login fails, an error message is displayed.
   */
  
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (response) => {
        this.fetchApiData.saveUserDataToLocalStorage(response);
        this.dialogRef.close(); // Close modal on success
        this.snackBar.open('User successfully logged in', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        console.log('Login error:', error);
        this.snackBar.open('Login failed', 'OK', {
          duration: 2000,
        });
      }
    });
  }
}
