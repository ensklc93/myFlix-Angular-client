/**
 * @file app.module.ts
 * @description The root module of the MyVideo Angular application.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar'

// Application Components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { GenreInfoComponent } from './genre-info/genre-info.component';
import { DescriptionInfoComponent } from './description-info/description-info.component';
import { ProfileComponent } from './profile/profile.component';

/**
 * Defines the routes for the application.
 */

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

/**
 * @class AppModule
 * @description The root module that bootstraps and configures the MyVideo Angular application.
 */

@NgModule({
  
  /**
   * @property declarations
   * @description The components that belong to this module.
   */

  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    DirectorInfoComponent,
    GenreInfoComponent,
    DescriptionInfoComponent,
    ProfileComponent
  ],

  /**
   * @property imports
   * @description External modules that are required by components in this module.
   */

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes)
  ],

  /**
   * @property providers
   * @description Services and other providers that are available to components in this module.
   */

  providers: [provideHttpClient(withFetch()), provideAnimationsAsync()
  ],

  /**
   * @property bootstrap
   * @description The root component that Angular creates and inserts into the index.html host web page.
   */

  bootstrap: [AppComponent]
})
export class AppModule { }
