import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css'],
})
export class DialogoDeleteComponent {
  constructor(
    private dialogReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDelete: any
  ) {}

  eliminarDato() {
    if (this.dataDelete) {
      this.dialogReferencia.close('eliminar');
    }
  }
}
