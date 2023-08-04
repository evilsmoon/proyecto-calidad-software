import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, HostListener, OnInit, computed } from '@angular/core';
import { Product, ProductCart } from 'src/app/interfaces/product.interfaces';
import { ProductService } from 'src/app/services/product.service';
import { MetricsService } from 'src/app/services/metrics.service';
import { ErrorBilling, SuccessBillingTime } from 'src/app/interfaces/metric.interfaces';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent implements OnInit {
  products: ProductCart[] = [];
  startTime: Date | null = null;
  timerInterval: any;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  visible: boolean = true;
  public user = computed(() => this.authServ.currentUser());

  constructor(
    private fb: FormBuilder,
    private productoServ: ProductService,
    private metricServ: MetricsService,
    private authServ: AuthService
  ) {}

  public debitCardForm: FormGroup = this.fb.group({
    CARDNUMBER: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    CARDNAMECARD: ['', [Validators.required]],
    CARDEXPIRATIONDATE: [
      '',
      [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/)],
    ],
    CARDSECURITYCODE: [
      '',
      [Validators.required, Validators.pattern(/^\d{3}$/)],
    ],
  });
  public shippingAddressForm: FormGroup = this.fb.group({
    PROVINCE: ['', Validators.required],
    CITY: ['', Validators.required],
    STREETADDRESS: ['', Validators.required],
    NEIGHBORHOOD: ['', Validators.required],
    PHONENUMBER: ['', Validators.required],
  });

  ngOnInit(): void {
    this.startTime = new Date();
    this.timerInterval = setInterval(() => {}, 1000);

    this.products = this.productoServ.getShoppingCart();
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  getTimeElapsed(): number {
    const currentTime = new Date();
    return Math.floor(
      (currentTime.getTime() - this.startTime!.getTime()) / 1000
    );
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  handlePayment() {
    console.log(this.getTimeElapsed());
    clearInterval(this.timerInterval);

    if (this.user() !== null) {
      const data: SuccessBillingTime = {
        user_id: this.user()!._id,
        time: this.getTimeElapsed(),
        date: {
          day: `${moment().date()}`,
          month: `${moment().month() + 1}`,
          year: `${moment().year()}`,
        },
      };

      this.metricServ.postSuccessBillingTime(data).subscribe((resp) => {
        console.log(resp);
      });
    } else {
      console.log('data');
    }
  }
  /*   @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  } */

  showDialog() {
    this.visible = true;
  }

  generateNumbersArray(max: number): number[] {
    return Array.from({ length: max }, (_, index) => index + 1);
  }

  onCardNumberInput() {
    let cardNumber = this.debitCardForm.controls['CARDNUMBER'].value;
    // Eliminar cualquier caracter que no sea un número
    cardNumber = cardNumber.replace(/[^0-9]/g, '');

    // Aplicar la máscara a la tarjeta (agregar espacio cada 4 dígitos)
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Si se ingresaron más de 16 dígitos, recortar el número a 16 dígitos
    if (cardNumber.length > 19) {
      cardNumber = cardNumber.substr(0, 19);
    }

    // Actualizar el valor en el formulario
    this.debitCardForm.controls['CARDNUMBER'].setValue(cardNumber);
  }

  onCardSecurityCodeInput() {
    // Obtener el valor actual del campo CARDSECURITYCODE
    let cardSecurityCode =
      this.debitCardForm.controls['CARDSECURITYCODE'].value;

    // Eliminar cualquier caracter que no sea un número
    cardSecurityCode = cardSecurityCode.replace(/[^0-9]/g, '');

    // Si se ingresaron más de 3 dígitos, recortar el valor
    if (cardSecurityCode.length > 3) {
      cardSecurityCode = cardSecurityCode.substr(0, 3);
    }

    // Actualizar el valor en el formulario
    this.debitCardForm.controls['CARDSECURITYCODE'].setValue(cardSecurityCode);
  }

  onCardExpirationDateInput() {
    let cardExpirationDate =
      this.debitCardForm.controls['CARDEXPIRATIONDATE'].value;
    // Eliminar cualquier caracter que no sea un número
    cardExpirationDate = cardExpirationDate.replace(/[^0-9]/g, '');

    // Si se ingresaron más de 4 dígitos, recortar la fecha a 4 dígitos
    if (cardExpirationDate.length > 4) {
      cardExpirationDate = cardExpirationDate.substr(0, 4);
    }

    // Aplicar la máscara a la fecha de expiración (agregar / después de los primeros 2 dígitos)
    if (cardExpirationDate.length > 2) {
      cardExpirationDate = cardExpirationDate.replace(/^(\d{2})/, '$1/');
    }

    // Actualizar el valor en el formulario
    this.debitCardForm.controls['CARDEXPIRATIONDATE'].setValue(
      cardExpirationDate
    );
  }

  isValidCardNumber(cardNumber: string): boolean {
    // Eliminar cualquier caracter que no sea un número
    cardNumber = cardNumber.replace(/[^0-9]/g, '');

    // Convertir el número en un array de dígitos (números)
    const digits = cardNumber.split('').map(Number);

    // Verificar que haya al menos 2 dígitos en el número de tarjeta
    if (digits.length < 2) {
      return false;
    }

    // Invertir el array de dígitos
    digits.reverse();

    // Sumar los dígitos en las posiciones impares
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      if (i % 2 !== 0) {
        let doubledDigit = digits[i] * 2;
        if (doubledDigit > 9) {
          doubledDigit -= 9;
        }
        sum += doubledDigit;
      } else {
        sum += digits[i];
      }
    }

    // La tarjeta es válida si la suma total es divisible por 10
    return sum % 10 === 0;
  }

  isValidExpirationDate(): boolean {
    const expirationDate =
      this.debitCardForm.controls['CARDEXPIRATIONDATE'].value;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Obtener solo los últimos dos dígitos del año
    const currentMonth = currentDate.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el mes actual correcto

    // Eliminar cualquier caracter que no sea un número
    const sanitizedExpirationDate = expirationDate.replace(/[^0-9]/g, '');

    // Verificar si se ingresó una fecha válida con el formato MM/YY
    const expirationYear = Number(sanitizedExpirationDate.slice(-2));
    const expirationMonth = Number(sanitizedExpirationDate.slice(0, 2));

    if (isNaN(expirationYear) || isNaN(expirationMonth)) {
      return false;
    }

    // Obtener el año actual en el formato de 2 dígitos
    const currentYearLastTwoDigits = currentYear % 100;

    // Verificar si la fecha de expiración es mayor o igual a la fecha actual
    if (
      expirationYear < currentYearLastTwoDigits ||
      (expirationYear === currentYearLastTwoDigits &&
        expirationMonth < currentMonth)
    ) {
      return false;
    }

    // Verificar que el mes sea válido (entre 01 y 12)
    if (expirationMonth < 1 || expirationMonth > 12) {
      return false;
    }

    // Verificar que la fecha de expiración no sea mayor a 20 años en el futuro
    const maxExpirationYear = currentYearLastTwoDigits + 20;
    if (expirationYear > maxExpirationYear) {
      return false;
    }

    return true;
  }

  isCardNumberValid(): boolean {
    const cardNumber = this.debitCardForm.controls['CARDNUMBER'].value;
    return this.isValidCardNumber(cardNumber.replace(/\s+/g, ''));
  }

  isInValidField(field: string) {
    return (
      this.debitCardForm.controls[field].errors &&
      this.debitCardForm.controls[field].touched
    );
  }

  isValidField(field: string) {
    return (
      this.debitCardForm.controls[field].valid &&
      (this.debitCardForm.controls[field].touched ||
        this.debitCardForm.controls[field].pristine ||
        this.debitCardForm.controls[field].dirty)
    );
  }
  calculateTotalQuantity() {
    this.totalQuantity = this.products.reduce(
      (total, product) => total + product.currentQty,
      0
    );
  }
  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((total, product) => {
      return total + product.currentPrice * product.currentQty;
    }, 0);
  }

  onChangeQuantity(event: any, product: ProductCart) {
    const indexOfObject = this.products.findIndex((element) => {
      return element._id === product._id;
    });
    this.products[indexOfObject].currentQty = parseInt(event.target.value);
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
  }

  removeProduct(product: ProductCart) {
    this.productoServ.removeProduto(product);
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    
    if (this.user() !== null) {
      const data: ErrorBilling = {
        user_id: this.user()!._id,
        date: {
          day: `${moment().date()}`,
          month: `${moment().month() + 1}`,
          year: `${moment().year()}`,
        },
      };

      console.log(data);
      this.metricServ
        .postErrorBilling(data)
        .subscribe((resp) => console.log(resp));
    }
    
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (this.user() !== null) {
      const data: ErrorBilling = {
        user_id: this.user()!._id,
        date: {
          day: `${moment().date()}`,
          month: `${moment().month() + 1}`,
          year: `${moment().year()}`,
        },
      };

      console.log(data);
      this.metricServ
        .postErrorBilling(data)
        .subscribe((resp) => console.log(resp));
    }
  }
}
