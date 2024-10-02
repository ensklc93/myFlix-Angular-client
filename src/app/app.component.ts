/**
 * @file app.component.ts
 * @description Root component of the MyVideo Angular application. 
 * This component serves as the entry point for the entire application.
 */

import { Component } from '@angular/core';

/**
 * @component AppComponent
 * @description The main application component that acts as the root container.
 * This component hosts the main structure of the app and its child components.
 */

@Component({
  selector: 'app-root', // Defines the custom HTML tag to represent this component.
  templateUrl: './app.component.html', // Path to the component's HTML template.
  styleUrls: ['./app.component.scss'] // Path to the component's styles.
})

export class AppComponent {

  /**
   * @property {string} title
   * @description The title of the application, used in the template.
   */
  
  title = 'MyVideo-Angular-app';
}