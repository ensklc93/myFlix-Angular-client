/**
 * @file fetch-api-data.service.ts
 * @description This service handles all HTTP requests to the movie API, including user registration, login, fetching movies, and user-related actions.
 */

import { Injectable, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * The base URL of the movie API.
 */
const apiUrl = 'https://my-movie-app-ab91e4bb4611.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

/**
 * @class FetchApiDataService
 * @description This service provides methods to interact with the API for user authentication, movie retrieval, and user profile management.
 */

export class FetchApiDataService {

  /**
   * @constructor
   * @param {HttpClient} http - Angular's HTTP client module used for making HTTP requests.
   * @param {Object} platformId - Identifies the platform (browser or server) for compatibility checks.
   */

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * Get the authentication token from local storage.
   * @private
   * @returns {string} The user's authentication token, or an empty string if not available.
   */

  private getToken(): string {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  /**
   * Register a new user.
   * @param {any} userData - The user's registration details including username, password, email, and birthday.
   * @returns {Observable<any>} Observable with the registration response, containing user data or error.
   */

  public userRegistration(userData: any): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${apiUrl}users`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
   * Login an existing user.
   * @param {any} userData - The user's login details including username and password.
   * @returns {Observable<any>} Observable with the login response, containing user data or error.
   */

  public userLogin(userData: any): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${apiUrl}login`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Save user data (token and user information) to local storage.
   * @param {any} userData - The user data to save, including token and user details.
   */

  saveUserDataToLocalStorage(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
  }

  /**
   * Get all movies.
   * @returns {Observable<any>} Observable with the list of all movies or error.
   */
  
  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get a specific movie by title.
   * @param {string} title - The title of the movie to retrieve.
   * @returns {Observable<any>} Observable with the movie data or error.
   */

  public getOneMovie(title: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${apiUrl}movies/${encodeURIComponent(title)}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get a specific movie by its ID.
   * @param {string} movieId - The ID of the movie to retrieve.
   * @returns {Observable<any>} Observable with the movie data or error.
   */

  public getOneMovieById(movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${apiUrl}movies/${encodeURIComponent(movieId)}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get director information by name.
   * @param {string} directorName - The name of the director to retrieve information for.
   * @returns {Observable<any>} Observable with the director data or error.
   */

  public getDirector(directorName: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${apiUrl}movies/directors/${encodeURIComponent(directorName)}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get genre information by name.
   * @param {string} genreName - The name of the genre to retrieve information for.
   * @returns {Observable<any>} Observable with the genre data or error.
   */

  public getGenre(genreName: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${apiUrl}movies/genre/${encodeURIComponent(genreName)}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get user information by username.
   * @param {string} username - The username of the user to retrieve information for.
   * @returns {Observable<any>} Observable with the user data or error.
   */

  public getUser(username: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${apiUrl}users/${encodeURIComponent(username)}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Add a movie to the user's favorite movies.
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to add to favorites.
   * @returns {Observable<any>} Observable with the response or error.
   */

  public addMovieToFavorites(username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${apiUrl}users/${encodeURIComponent(username)}/movies/${encodeURIComponent(movieId)}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edit user information.
   * @param {string} username - The username of the user to edit.
   * @param {any} updatedData - The updated user data.
   * @returns {Observable<any>} Observable with the updated user data or error.
   */

  public editUser(username: string, updatedData: any): Observable<any> {
    const token = this.getToken();
    return this.http.put(`${apiUrl}users/${encodeURIComponent(username)}`, updatedData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete a user account.
   * @param {string} username - The username of the user to delete.
   * @returns {Observable<any>} Observable with the response or error.
   */

  public deleteUser(username: string): Observable<any> {
    const token = this.getToken();
    return this.http.delete(`${apiUrl}users/${encodeURIComponent(username)}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Remove a movie from the user's favorite movies.
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to remove from favorites.
   * @returns {Observable<any>} Observable with the response or error.
   */
  
  public removeMovieFromFavorites(username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http.delete(`${apiUrl}users/${encodeURIComponent(username)}/movies/${encodeURIComponent(movieId)}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Extract response data from the API response.
   * @private
   * @param {any} res - The API response.
   * @returns {any} The extracted response data.
   */

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**

    Handle errors that occur during HTTP requests.
    @private
    @param {HttpErrorResponse} error - The error response from the HTTP request.
    @returns {Observable<never>} An observable that emits an error. 
    */

  private handleError(error: HttpErrorResponse): any {
    let errorMessage = '';

    if (isPlatformBrowser(this.platformId) && error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `A network error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      if (error.error && typeof error.error === 'object') {
        // If the error response is an object, stringify it for better readability
        errorMessage = `Error ${error.status}: ${JSON.stringify(error.error)}`;
      } else {
        // Otherwise, use the error message directly
        errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error(errorMessage);

    // Return the detailed error message
    return throwError(() => new Error(errorMessage));
  }

}
