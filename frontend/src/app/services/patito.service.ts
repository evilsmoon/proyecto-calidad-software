import { Injectable, inject ,signal,computed} from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PatitoService {

  
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );


  get(): Observable<any> {
    const url =  `${this.baseUrl}/product`
    return this.http.get(url);
  }

/*   url: string = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}


  getProductos() {} */
}
