import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

}
