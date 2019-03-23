import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

export interface LoadFromDialogData {
  sourceType: string;
  id: number;
}

@Component({
  selector: 'app-load-from-dialog',
  templateUrl: './load-from-dialog.component.html',
  styleUrls: ['./load-from-dialog.component.scss']
})
export class LoadFromDialogComponent implements OnInit {

  idControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<LoadFromDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoadFromDialogData) {
      this.idControl = new FormControl(data.id, [
        Validators.required,
        Validators.min(0),
      ]);
    }

  ngOnInit() {
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  loadClick(): void {
    if (!this.idControl.valid) {
      return;
    }
    this.dialogRef.close(this.idControl.value);
  }
}
