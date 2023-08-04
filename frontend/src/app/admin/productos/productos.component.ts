import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatitoService } from 'src/app/services/patito.service';


@Component({
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  

  visible: boolean = false;
  productos: any = [];

  showDialog() {
      this.visible = true;
  }
  
  constructor(
    private fb                  : FormBuilder,
    private patitoServ: PatitoService
  ){

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.patitoServ.get().subscribe((resp) => {
      this.productos = resp;  
      console.log(this.productos);
    });
  }

  
  public formularioCliente: FormGroup = this.fb.group(
    {
      NOMBRE                : ["", [Validators.required]],
      APELLIDO              : ["", [Validators.required]],
      TIPOIDENTIFICACION    : ["", [Validators.required]],
      NUMEROIDENTIFICACION  : ["", [Validators.required]],
      CARGO                 : ["", [Validators.required]],
      CORREOELECTRONICO     : ["", [Validators.required,Validators.email]],
      NUMEROCELULAR         : ["", [Validators.required]],
      CUENTAS: this.fb.array([], Validators.required),
    },
  );
  get cuentasCliente(): FormArray {
    return this.formularioCliente.get('CUENTAS') as FormArray;
  }


}
