import { Component, OnInit } from '@angular/core';
import { PatitoService } from 'src/app/services/patito.service';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'primeng/api';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  layout: string = 'list';
  productos: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private productoServ: ProductService,
    private patitoServ: PatitoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.patitoServ.get().subscribe((resp) => (this.productos = resp));
  }

  showSuccess() {

  }

  addMyCart(producto: any) {
    const resp = this.productoServ.addProducto(producto);

    if (resp) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product added to cart: ${producto.name}`,
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: `The product is already in the cart`,
      });
    }
  }
  updatePrice(item: any) {
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
