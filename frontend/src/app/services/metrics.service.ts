import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ErrorBilling, SuccessBillingTime } from '../interfaces/metric.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );


  postSuccessBillingTime(data :SuccessBillingTime){
    const url = `${this.baseUrl}/metrics/billingtime`;
    return this.http.post(url,data);
  }

  postErrorBilling(data:ErrorBilling){

    const url = `${this.baseUrl}/metrics/errorbilling`;
    return this.http.post(url,data);
  }  
  postOnlineHelp(data:any){

    const url = `${this.baseUrl}/metrics/onlinehelp`;
    return this.http.post(url,data);
  }

  getSuccessBillingTime(data:any){
    const url = `${this.baseUrl}/metrics/billingtime`
    return this.http.get(url,data)
  }
  
}
