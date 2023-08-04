import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  basicData: any;

  basicOptions: any;

  billingTimedata: any = [];

  month_dict:any = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre"
  }

  constructor( private metrics: MetricsService ){

  }

  

    ngOnInit() {

        let meses = Object.keys(this.month_dict);
        meses.sort()

        

        this.metrics.getSuccessBillingTime({"date.month": "07"}).subscribe( (resp) => {
            this.billingTimedata = resp
            console.log(this.billingTimedata);
            console.log(this.billingTimedata.filter( (el:any) => (el.date.month == "08") ));
            
        })

        // const filtered_data = this.billingTimedata.filter( (el:any) => (el.date.month == "08") )

        // console.log(filtered_data);
        


        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Tiempo empleado en completar una transaccion (s)',
                    data: [540, 325, 702, 620, 40, 25, 702, 620, 740, 325],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
