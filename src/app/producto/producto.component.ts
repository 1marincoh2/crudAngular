import { HttpService } from '../serviceshttp/http.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
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
    'Prodcutos',
    'thumbnail',
    'description',
    'precio',
    'actions',
  ];

  divColor: string = '#A7ABB7';
  btnAdd: string = '#3F51B5';
  textColor: string = 'white';
  // dialogRef: MatDialogRef<any> | null | undefined;

  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    this.dialog
      .open(DialogFormComponent, dialogConfig)
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.getDatosUsuario();
        }
      });
  }

  eliminar() {
    // Lógica para eliminar la tarjeta
  }

  editar() {
    // Lógica para editar la tarjeta
  }

  getDatosUsuario() {
    this.httpService.getDatos().subscribe((data: any) => {
      this.data = data;
      console.log(data, 'data del servidor');
    });
  }
  ngOnInit(): void {
    this.getDatosUsuario();
  }
}
