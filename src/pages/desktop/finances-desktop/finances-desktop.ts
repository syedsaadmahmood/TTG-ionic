import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FinancesDesktopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var Highcharts:any;

@Component({
  selector: 'page-finances-desktop',
  templateUrl: 'finances-desktop.html',
})
export class FinancesDesktopPage {

  earning:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Chart();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinancesDesktopPage');
  }

  initializeGraph(x,y){
    var chart = Highcharts.chart('container', {

      chart: {
        type: 'column',
        marginTop: 20
      },

      legend: {
        enabled: false
      },

      title: {
        text: '',

      },

      // subtitle: {
      //   text: 'Resize the frame or click buttons to change appearance'
      // },

      // legend: {
      //   align: 'right',
      //   verticalAlign: 'middle',
      //   layout: 'vertical'
      // },

      xAxis: {
        categories: x,
        labels: {
          x: -10
        }
      },

      yAxis: {
        allowDecimals: true,
        title: {
          text: 'Earnings'
        }
      },
      tooltip: {
        formatter: function() {
          return this.x + '<br>' + '<span style="color:#7cb5ec">\u25CF</span> '+ this.series.name + ': '+this.y +' PKR' ;
        }
      },
      series: [{
        name: 'Daily Earnings',
        data: y
      }
      // , {
      //   name: 'Christmas Day before dinner',
      //   data: [6, 4, 2]
      // }, {
      //   name: 'Christmas Day after dinner',
      //   data: [8, 4, 3]
      // }
      ],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5
              },
              title: {
                text: null
              }
            },
            subtitle: {
              text: null
            },
            credits: {
              enabled: false
            }
          }
        }]
      }
    });

    // chart.setSize(300, 300);


  }



  Chart() {
    //get Graph data

    this.earning = 0;

        var xdata=[];
        var ydata=[];

         var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var loop=12;

        // if(this.account.detail.length<6){
        //   loop=this.account.detail.length;
        // }
        // else loop=6;

        for(var i=0; i<loop; i++){
          var date=new Date();
          console.log("date", date);

          xdata = monthNames;

          // xdata.push(date.getDate()+' '+monthNames[date.getMonth()]);

          // for(var j=0;j<this.account.detail[i].account_history.length;j++){
          //   if(this.account.detail[i].account_history[j].transaction_type=='Delivery Fee'){
          //     earning=earning+parseFloat(this.account.detail[i].account_history[j].transaction_amount);
          //   }
          //
          //   if(this.account.detail[i].account_history[j].transaction_type=='Service Fee'){
          //     earning=earning-parseFloat(this.account.detail[i].account_history[j].transaction_amount);
          //   }
          //
          //
          // }
          this.earning = this.earning + 10;
          ydata.push({y:this.earning, color: '#727272'});

        }

        // xdata.reverse();
        ydata.reverse();

        setTimeout(()=>{
          this.initializeGraph(xdata,ydata);
        },100)
  }

}
