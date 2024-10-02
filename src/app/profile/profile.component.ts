/**
 * @file profile.component.ts
 * @description This component handles displaying and managing user profile information, 
 *              including updating user details, viewing favorite movies, and deleting the user account.
 */

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { DescriptionInfoComponent } from '../description-info/description-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @class ProfileComponent
 * @description Component for displaying and managing user profile, including favorites and user data.
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent implements OnInit {
  /** Object holding user information */
  userData: any = {};

  /** Array holding the user's favorite movies */
  favoriteMovies: any[] = [];

  /** Array to store all movies, used to find favorites */
  allMovies: any[] = [];

  /** Boolean to toggle the edit form visibility */
  editMode: boolean = false;

  /** Object holding updated user information */
  updatedUserData: any = {};

  /**
   * @constructor
   * @param {Object} platformId - The platform (browser/server) identifier for platform-specific operations
   * @param {Router} router - Angular router for navigation
   * @param {FetchApiDataService} fetchApiData - Service for making API calls
   * @param {MatDialog} dialog - Material dialog for displaying movie info
   * @param {MatSnackBar} snackBar - Material snackbar for notifications
   */

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs when the component is initialized. 
   *              Fetches user data and favorite movies.
   */

  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * @method getUserData
   * @description Fetches user data from the API and loads their favorite movies.
   */

  getUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userData = JSON.parse(storedUser);
        this.fetchApiData.getUser(this.userData.Username).subscribe(
          (resp) => {
            this.userData = resp;
            const favoriteMovieIds: string[] = resp.FavoriteMovies;

            if (favoriteMovieIds.length > 0) {
              this.fetchApiData.getAllMovies().subscribe(
                (movies: any[]) => {
                  this.allMovies = movies;
                  this.favoriteMovies = this.allMovies.filter(movie => favoriteMovieIds.includes(movie._id));

                  if (this.favoriteMovies.length !== favoriteMovieIds.length) {
                    this.snackBar.open('Some favorite movies could not be loaded.', 'OK', { duration: 3000 });
                  }
                },
                (error) => {
                  console.error('Error fetching all movies:', error);
                  this.snackBar.open('Failed to load favorite movies.', 'OK', { duration: 3000 });
                }
              );
            } else {
              this.favoriteMovies = [];
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
            this.snackBar.open('Failed to load user data.', 'OK', { duration: 3000 });
          }
        );
      }
    }
  }

  /**
   * @method openDescriptionInfoDialog
   * @description Opens a dialog with the movie's description information.
   * @param {any} movie - The movie data to display.
   */

  openDescriptionInfoDialog(movie: any): void {
    this.dialog.open(DescriptionInfoComponent, {
      data: movie,
      width: '500px'
    });
  }

  /**
   * @method openDirectorDialog
   * @description Opens a dialog with the director's information.
   * @param {any} director - The director data to display.
   */

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: director,
      width: '500px'
    });
  }

  /**
   * @method openGenreDialog
   * @description Opens a dialog with the genre's information.
   * @param {any} genre - The genre data to display.
   */

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: genre,
      width: '500px'
    });
  }

  /**
   * @method toggleEditMode
   * @description Toggles the edit mode to show or hide the edit form for the user's profile.
   */

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      // Initialize updatedUserData with current user data
      this.updatedUserData = {
        Email: this.userData.Email,
        Birthday: this.formatDate(this.userData.Birthday),
        Password: '' // Empty; user can enter new password if they want to change
      };
    }
  }

  /**
   * @method formatDate
   * @description Formats a date string to 'YYYY-MM-DD' format.
   * @param {string} dateString - The original date string.
   * @returns {string} - The formatted date string.
   */

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  /**
   * @method updateUser
   * @description Updates the user's profile information.
   */

  updateUser(): void {
    const username = this.userData.Username;
    const updatedData: any = {};

    // Include Email if it's changed
    if (this.updatedUserData.Email && this.updatedUserData.Email !== this.userData.Email) {
      updatedData.Email = this.updatedUserData.Email; // Ensure the key matches API expectations
    }

    // Include Birthday if it's changed
    if (this.updatedUserData.Birthday && this.updatedUserData.Birthday !== this.formatDate(this.userData.Birthday)) {
      updatedData.Birthday = this.updatedUserData.Birthday; // Ensure the key matches API expectations
    }

    // Include CurrentPassword to authenticate the update
    if (this.updatedUserData.CurrentPassword) {
      updatedData.Password = this.updatedUserData.CurrentPassword; // Must match API's expected key
    } else {
      this.snackBar.open('Current password is required to update profile.', 'OK', { duration: 3000 });
      return;
    }

    // Include NewPassword if the user wants to change it
    if (this.updatedUserData.NewPassword) {
      updatedData.NewPassword = this.updatedUserData.NewPassword; // Must match API's expected key
    }

    // Debugging: Log the payload to ensure correctness
    console.log('Updated Data Payload:', updatedData);

    // Check if there are any changes to update
    if (Object.keys(updatedData).length === 0) {
      this.snackBar.open('No changes detected.', 'OK', { duration: 2000 });
      return;
    }

    // Call the service to update the user
    this.fetchApiData.editUser(username, updatedData).subscribe(
      (resp) => {
        this.userData = resp;
        this.saveUserDataToLocalStorage(resp);
        this.snackBar.open('Profile updated successfully.', 'OK', { duration: 2000 });
        this.editMode = false;
      },
      (error) => {
        console.error('Error updating user data:', error);
        // Display the detailed error message
        this.snackBar.open(`Failed to update profile: ${error.message}`, 'OK', { duration: 5000 });
      }
    );
  }

  /**
   * @method saveUserDataToLocalStorage
   * @description Saves the updated user data to localStorage.
   * @param {any} userData - The updated user data.
   */

  saveUserDataToLocalStorage(userData: any): void {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  }
  }

  /**
   * @method deleteAccount
   * @description Deletes the user's account after confirmation.
   */

  deleteAccount(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const username = this.userData.Username;

    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser(username).subscribe(
        () => {
          localStorage.clear(); // Clear user data from local storage
          this.snackBar.open('Account deleted successfully.', 'OK', { duration: 2000 });
          this.router.navigate(['/welcome']); // Navigate back to the welcome page
        },
        (error) => {
          console.error('Error deleting user account:', error);
          this.snackBar.open('Failed to delete account.', 'OK', { duration: 3000 });
        }
      );
    }
  }

/**
   * @method removeFromFavorites
   * @description Removes a movie from the user's favorite list.
   * @param {string} movieId - The ID of the movie to remove.
   */

  removeFromFavorites(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.removeMovieFromFavorites(user.Username, movieId).subscribe(
      () => {
        this.favoriteMovies = this.favoriteMovies.filter((movie) => movie._id !== movieId);
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error removing movie from favorites:', error);
        this.snackBar.open('Failed to remove movie from favorites.', 'OK', { duration: 3000 });
      }
    );
  }

  /**
   * @method scrollToTop
   * @description Smooth scrolls the window back to the top.
   */

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * @method logout
   * @description Logs out the user by clearing localStorage and navigating to the welcome page.
   */
  
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.clear(); // Clear user data from local storage
    this.router.navigate(['/welcome']); // Navigate back to the welcome page
  }
  }
}
