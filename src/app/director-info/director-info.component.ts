/**
 * @file director-info.component.ts
 * @description This component displays detailed information about a movie's director, presented in a dialog box.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @class DirectorInfoComponent
 * @description Component for displaying director information in a dialog.
 */

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent {

  /**
   * @constructor
   * @param {any} data - Injected data containing the director's information.
   * The data is injected into the dialog component from the parent component.
   */
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}