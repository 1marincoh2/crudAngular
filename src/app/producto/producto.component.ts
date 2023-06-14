import { HttpService } from '../serviceshttp/http.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogFormComponent } from '../Dialogs/dialog-form/dialog-form.component';
import { DialogoDeleteComponent } from '../Dialogs/dialogo-delete/dialogo-delete.component';
interface Item {
  name: string;
  email: string;
  id: number;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  public data: any;
  //dialogTemplate: TemplateRef<any> | boolean | undefined;
  displayedColumns: string[] = [
    'title',
    'thumbnail',
    'description',
    'brand',
    'category',
    'actions',
  ];
  loading: boolean = false;
  divColor: string = '#A7ABB7';
  btnAdd: string = '#3F51B5';
  textColor: string = 'white';
  // dialogRef: MatDialogRef<any> | null | undefined;

  constructor(
    private httpService: HttpService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    this.dialog
      .open(DialogFormComponent, dialogConfig)
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.getDatosProducto();
        }
      });
  }

  openEditDialog(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    dialogConfig.data = item;
    this.dialog
      .open(DialogFormComponent, dialogConfig)
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.getDatosProducto();
        }
      });
  }

  openDeleteDialog(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.data = item;
    this.dialog
      .open(DialogoDeleteComponent, dialogConfig)
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'eliminar') {
          this.httpService.deleteDatos(item.id).subscribe({
            next: (data) => {
              this.mostrarAlerta(
                'El producto ' + item.title + ' se a eliminado correctamente',
                'Listo'
              );
              this.getDatosProducto();
            },
            error: (e) => {
              this.mostrarAlerta(e, 'Error');
            },
          });
        }
      });
  }

  getDatosProducto() {
    this.httpService.getDatos().subscribe((data: any) => {
      this.loading = false;
      this.data = data;
      console.log(data, 'data del servidor');
      this.loading = true;
    });
  }

  mostrarAlerta(mgs: string, action: string) {
    this._snackBar.open(mgs, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 8000,
    });
  }

  ngOnInit(): void {
    this.getDatosProducto();
  }
}
