import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {
  constructor(public dialogRef: MatDialogRef<PopupComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
    
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
