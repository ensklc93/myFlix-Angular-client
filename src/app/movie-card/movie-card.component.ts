import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { DescriptionInfoComponent } from '../description-info/description-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
    });
  }

  // Check if a movie is in the user's favorites
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  // Add or remove a movie from favorites
  toggleFavorite(movieId: string, movieTitle: string): void {
    if (this.isFavorite(movieId)) {
      // If it's already a favorite, remove it
      this.removeFromFavorites(movieId, movieTitle);
    } else {
      // Otherwise, add it
      this.addToFavorites(movieId, movieTitle);
    }
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: director,
      width: '500px'
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: genre,
      width: '500px'
    });
  }

  openDescriptionInfoDialog(movie: any): void {
    this.dialog.open(DescriptionInfoComponent, {
      data: movie,
      width: '500px'
    });
  }

  // Add movie to favorites
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


  // Scroll to the top of the page
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Logout the user and navigate to welcome page
  logout(): void {
    localStorage.clear(); // Clear user data from local storage
    this.router.navigate(['/welcome']); // Navigate back to the welcome page
  }

}
