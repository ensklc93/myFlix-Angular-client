import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// The API URL that will provide data for the client app
const apiUrl = 'https://my-movie-app-ab91e4bb4611.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  // Inject HttpClient module to constructor params
  // Provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Get token from local storage
  private getToken(): string {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  // User Registration
  // Making the API call for the user registration endpoint
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
  // User Login
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

  saveUserDataToLocalStorage(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
  }

  // Get All Movies
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

  // Get One Movie by Title
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


  // Get Director Information
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

  // Get Genre Information
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

  // Get User by Username
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

  // Add a Movie to Favorite Movies
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

  // Edit User
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

  // Delete User
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

  // Remove a Movie from Favorite Movies
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

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Handle the error in HTTP requests
  private handleError(error: HttpErrorResponse): any {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
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
