import { Component, OnInit } from '@angular/core';
import { PatitoService } from 'src/app/services/patito.service';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'primeng/api';
import { Product, ProductCart } from 'src/app/interfaces/product.interfaces';
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  layout: string = 'list';
  productos: Product[] = [];

  filteredProducts: Product[] = [];

  constructor(
    private productoServ: ProductService,
    private patitoServ: PatitoService,
    private messageService: MessageService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'es',"de","fr","qu","zh"]);
    const lang = translate.getBrowserLang()
    if( (lang !== 'es') && ( lang !== 'en')  && ( lang !== 'de')  && ( lang !== 'fr')  && ( lang !== 'qu')  && ( lang !== 'zh') ){
      translate.setDefaultLang('en');
    }

  }

  ngOnInit(): void {

    this.patitoServ.get().subscribe((resp) => {
      this.filterProducts =resp;
      this.productos =resp;
    });
  }

  addMyCart(producto: Product) {


    let product:ProductCart ={
      ...producto,
      currentPrice:producto.price,
      currentQty:1
    }   

    const resp = this.productoServ.addProducto(product);

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

  filterProducts() {
    const selectedSizes: string[] = [];
    const checkboxes = document.querySelectorAll('.form-check-input[type="checkbox"]:checked');

    checkboxes.forEach((checkbox: any) => {
      selectedSizes.push(checkbox.id.replace('formCheck-', ''));
    });

    if (selectedSizes.length === 0) {
      this.filteredProducts = this.productos;
    } else {
      this.filteredProducts = this.productos.filter((product) => selectedSizes.includes(product.size));
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
