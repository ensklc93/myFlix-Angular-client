/**
 * @file movie-card.component.ts
 * @description This component is responsible for displaying a list of movies and handling user interactions 
 *              such as viewing details, adding/removing favorites, and navigating between pages.
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
 * @class MovieCardComponent
 * @description Component for displaying movie cards and managing user interactions like viewing information 
 *              and adding/removing movies from favorites.
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /** Array to hold the list of movies fetched from the API */
  movies: any[] = [];

  /** Array to hold the user's favorite movies */
  favoriteMovies: any[] = [];

  /**
   * @constructor
   * @param {Router} router - Angular router for navigation
   * @param {FetchApiDataService} fetchApiData - Service for making API calls
   * @param {MatSnackBar} snackBar - Material snackbar for notifications
   * @param {MatDialog} dialog - Material dialog for displaying movie info
   * @param {Object} platformId - The platform (browser/server) identifier for platform-specific operations
   */

  constructor(
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs when the component is initialized. 
   *              Fetches movies and favorite movies, and scrolls to the top of the page.
   */

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
    if (isPlatformBrowser(this.platformId)) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * @method getMovies
   * @description Fetches the list of movies from the API.
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * @method getFavoriteMovies
   * @description Fetches the list of the user's favorite movies from the API.
   */

  getFavoriteMovies(): void {
    if (isPlatformBrowser(this.platformId)) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
    });
  }
  }

  /**
   * @method isFavorite
   * @description Checks if a movie is in the user's favorite list.
   * @param {string} movieId - The ID of the movie to check.
   * @returns {boolean} True if the movie is a favorite, otherwise false.
   */

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * @method toggleFavorite
   * @description Adds or removes a movie from the user's favorite list.
   * @param {string} movieId - The ID of the movie to add/remove.
   * @param {string} movieTitle - The title of the movie to add/remove.
   */

  toggleFavorite(movieId: string, movieTitle: string): void {
    if (this.isFavorite(movieId)) {
      // If it's already a favorite, remove it
      this.removeFromFavorites(movieId, movieTitle);
    } else {
      // Otherwise, add it
      this.addToFavorites(movieId, movieTitle);
    }
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
   * @method addToFavorites
   * @description Adds a movie to the user's favorite list.
   * @param {string} movieId - The ID of the movie to add.
   * @param {string} movieTitle - The title of the movie to add.
   */

  addToFavorites(movieId: string, movieTitle: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.fetchApiData.addMovieToFavorites(user.Username, movieId).subscribe((resp: any) => {
        this.favoriteMovies.push(movieId); // Add movie to the favorite list
        this.snackBar.open(`${movieTitle} has been added to your favorites!`, 'OK', {
          duration: 2000,
        });
      });
    }
  }

  /**
   * @method removeFromFavorites
   * @description Removes a movie from the user's favorite list.
   * @param {string} movieId - The ID of the movie to remove.
   * @param {string} movieTitle - The title of the movie to remove.
   */

  removeFromFavorites(movieId: string, movieTitle: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.fetchApiData.removeMovieFromFavorites(user.Username, movieId).subscribe((resp: any) => {
        this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId); // Remove from favorites
        this.snackBar.open(`${movieTitle} has been removed from your favorites!`, 'OK', {
          duration: 2000,
        });
      });
    }
  }

  /**
   * @method scrollToTop
   * @description Scrolls the page to the top.
   */

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * @method logout
   * @description Logs the user out by clearing local storage and navigating to the welcome page.
   */

  logout(): void {
    localStorage.clear(); // Clear user data from local storage
    this.router.navigate(['/welcome']); // Navigate back to the welcome page
  }

}
