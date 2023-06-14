import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../serviceshttp/http.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css'],
})
export class DialogFormComponent {
  productoForm = new FormGroup({
    content: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
  });
  tituloAction: string = 'Nuevo Producto';
  btnAction: string = 'Guardar';
  constructor(
    private dialogReferencia: MatDialogRef<DialogFormComponent>,
    private _snackBar: MatSnackBar,
    private _productSevice: HttpService
  ) {}

  mostrarAlerta(mgs: string, action: string) {
    this._snackBar.open(mgs, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  addEditDato() {
    this._productSevice.postDatos(this.productoForm.value).subscribe({
      next: (data) => {
        this.mostrarAlerta('El Usuario Registrado Correctamente', 'Listo');
        this.dialogReferencia.close('creado');
      },
      error: (e) => {
        this.mostrarAlerta('Error Al registrar el Usuario', 'error');
      },
    });
    console.log(this.productoForm.value);
  }
}
