import { Component, OnInit } from '@angular/core';
import { PatitoService } from 'src/app/services/patito.service';
import { ProductService } from 'src/app/services/product.service';
// import { OverlayPanel } from "primeng/overlaypanel";
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  layout: string = 'list';
  productos: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private productoServ : ProductService,
    private patitoServ   : PatitoService,
    ) { }

  ngOnInit(): void {
    this.patitoServ.get().subscribe(
      resp=>( this.productos =resp)
    )

  }
  addMyCart(producto:any){
    console.log(producto);  

    this.productoServ.addProducto(producto)
  }
  updatePrice(item:any){
    console.log(item);
  }
/*   getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  } */





}
