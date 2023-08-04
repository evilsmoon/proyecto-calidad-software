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
  promedioTiempo:Number = 0;
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

  dataView : number[]=[];

    ngOnInit() {
        console.log("object");
        let meses = Object.keys(this.month_dict);
        meses.sort()

        
        let  data = {"date.month": "8"} 
        this.metrics.getSuccessBillingTime(data ).subscribe( (resp) => {

            console.log(resp);
            this.billingTimedata = resp
            console.log(this.billingTimedata.length);
            
            let respPromedio  = this.billingTimedata.filter( (el:any) => (el.date.month == "8") );
            let tiempos = respPromedio.map((el:any) => el.time);

            // Calcular la suma de los tiempos
            let sumaTiempos = tiempos.reduce((acumulador:any, valorActual:any) => acumulador + valorActual, 0);
            

            this.promedioTiempo = parseFloat((sumaTiempos / tiempos.length).toFixed(2))
            console.log( );
            this.dataView =  [0 ,0 ,0 ,0,0 ,0 ,0,this.billingTimedata.length,0,0,0 ,0 ];
        })

        

        // const filtered_data = this.billingTimedata.filter( (el:any) => (el.date.month == "08") )

        // console.log(filtered_data);
        

        setTimeout(()=>{
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    
            this.basicData = {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre', 'Noviembre', 'Diciembre'],
                datasets: [
                    {
                        label: 'Compras exitosas',
                        data:   this.dataView,
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
        },1000)
 
    }
}
