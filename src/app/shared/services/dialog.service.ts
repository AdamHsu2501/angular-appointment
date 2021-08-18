import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../components/alert/alert.component';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  alert(): MatDialogRef<any> {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '80%',
    });

    return dialogRef;
  }

  //handle dialog
  processing(todo: Promise<any>): Promise<any> {
    const dialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true,
      panelClass: 'custom-dialog',
    });

    return todo.then(() => {
      return dialogRef.close();
    });
  }
}
