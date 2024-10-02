/**
 * @file welcome-page.component.ts
 * @description This component is the entry point of the application. It displays the options for user login and registration on the welcome page.
 */

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @class WelcomePageComponent
 * @description The WelcomePageComponent serves as the initial page of the application, providing buttons for users to either log in or register.
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * @constructor
   * @param {MatDialog} dialog - Service used to open dialog boxes for user login and registration.
   */

  constructor(public dialog: MatDialog) { }

  /**
  * @method ngOnInit
  * @description Lifecycle hook that runs when the component is initialized.
  */

  ngOnInit(): void {
  }

  /**
   * @method openUserRegistrationDialog
   * @description Opens the registration dialog when the user clicks on the "Sign Up" button.
   */

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * @method openUserLoginDialog
   * @description Opens the login dialog when the user clicks on the "Log In" button.
   */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}