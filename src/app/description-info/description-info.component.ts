/**
 * @file description-info.component.ts
 * @description This component displays detailed information about a movie description, presented in a dialog box.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @class DescriptionInfoComponent
 * @description Component for displaying movie descriptions in a dialog.
 */

@Component({
  selector: 'app-description-info',
  templateUrl: './description-info.component.html',
  styleUrls: ['./description-info.component.scss']
})
export class DescriptionInfoComponent {

  /**
   * @constructor
   * @param {any} data - Injected data containing the movie description.
   * The data is injected into the dialog component from the parent component.
   */
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
