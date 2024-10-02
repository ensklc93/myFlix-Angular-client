/**
 * @file genre-info.component.ts
 * @description This component displays detailed information about a movie genre, presented in a dialog box.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @class GenreInfoComponent
 * @description Component for displaying genre information in a dialog.
 */

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})
export class GenreInfoComponent {

  /**
   * @constructor
   * @param {any} data - Injected data containing the genre's information.
   * The data is injected into the dialog component from the parent component.
   */
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
