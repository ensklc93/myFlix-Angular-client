import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-info',
  templateUrl: './description-info.component.html',
  styleUrls: ['./description-info.component.scss']
})
export class DescriptionInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
