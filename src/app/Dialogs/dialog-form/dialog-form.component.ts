import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../serviceshttp/http.service';
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
export class DialogFormComponent implements OnInit {
  productoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    thumbnail: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  tituloAction: string = 'Nuevo Producto';
  btnAction: string = 'Guardar';
  constructor(
    private dialogReferencia: MatDialogRef<DialogFormComponent>,
    private _snackBar: MatSnackBar,
    private _productSevice: HttpService,
    @Inject(MAT_DIALOG_DATA) public dataEditar: any
  ) {}

  mostrarAlerta(mgs: string, action: string) {
    this._snackBar.open(mgs, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 8000,
    });
  }

  addEditDato() {
    const payload = {
      title: this.productoForm.value.title,
      thumbnail: this.productoForm.value.thumbnail,
      description: this.productoForm.value.description,
      brand: this.productoForm.value.brand,
      category: this.productoForm.value.category,
    };

    if (this.dataEditar == null) {
      this._productSevice.postDatos(payload).subscribe({
        next: (data) => {
          this.mostrarAlerta(
            'El Producto se Registrado Correctamente',
            'Listo'
          );
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          this.mostrarAlerta('Error Al registrar el Producto', 'error');
        },
      });
    } else {
      this._productSevice.UpdateDatos(this.dataEditar.id, payload).subscribe({
        next: (data) => {
          this.mostrarAlerta(
            'El Producto se a Actualizado Correctamente',
            'Listo'
          );
          this.dialogReferencia.close('editado');
        },
        error: (e) => {
          this.mostrarAlerta('Error Al registrar el Producto', 'error');
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.dataEditar) {
      this.productoForm.patchValue({
        title: this.dataEditar.title,
        thumbnail: this.dataEditar.thumbnail,
        description: this.dataEditar.description,
        brand: this.dataEditar.brand,
        category: this.dataEditar.category,
      });
      this.tituloAction = 'Editando Producto: ' + this.productoForm.value.title;
      this.btnAction = 'Actualizar';
    }
  }
}
