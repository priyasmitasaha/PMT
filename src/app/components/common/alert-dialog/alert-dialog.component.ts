import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})

export class AlertDialogComponent {
  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
    
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
