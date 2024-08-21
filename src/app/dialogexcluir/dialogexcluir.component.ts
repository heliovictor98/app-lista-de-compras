import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogexcluir',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,MatButtonModule],
  templateUrl: './dialogexcluir.component.html',
  styleUrl: './dialogexcluir.component.scss'
})
export class DialogexcluirComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogexcluirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    console.log(true);
    this.dialogRef.close(true);
  }

  onCancel(): void {
    console.log(false);
    this.dialogRef.close(false);
  }
}
