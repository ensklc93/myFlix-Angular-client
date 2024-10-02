/**
 * @file app-routing.module.ts
 * @description Defines the routing configuration for the MyVideo Angular application.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileComponent } from './profile/profile.component';


/**
 * @constant routes
 * @description The routes array defines the navigation paths for the application.
 * - `welcome`: Displays the WelcomePageComponent.
 * - `movies`: Displays the MovieCardComponent.
 * - `profile`: Displays the ProfileComponent.
 * - Default path redirects to `welcome` when no route is provided.
 */

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

/**
 * @class AppRoutingModule
 * @description Configures and provides the app’s routing functionality.
 */

@NgModule({
   /**
   * @property imports
   * @description Imports the RouterModule and configures it with the application routes.
   */

  imports: [RouterModule.forRoot(routes)],

  /**
   * @property exports
   * @description Exports the RouterModule so it can be available throughout the app.
   */
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
