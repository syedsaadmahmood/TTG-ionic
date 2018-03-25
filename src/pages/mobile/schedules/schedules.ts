import {Component, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  CalendarDateFormatter,
  CalendarEvent
} from 'angular-calendar';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CustomDateFormatter} from "../../../providers/custom/custom-date-formatter.provider";

/**
 * Generated class for the SchedulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-schedules',
  templateUrl: 'schedules.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class SchedulesPage {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  schedules = [];
  view: string = 'week';
  count_time: number = 9;
  total_time: number = 12;
  viewDate: Date = new Date();
  meridiem: any = "am";

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: NgbModal, private chRef: ChangeDetectorRef) {
    this.createSchedule();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulesPage');
  }

  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //       this.viewDate = date;
  //     }
  //   }
  // }



  toggleClicked() {
    // var temp = this.viewDate.toLocaleDateString();
    // console.log("date", temp);
    if(this.view == 'week') this.view = 'month';
    else this.view = 'week';
    this.chRef.detectChanges();
  }

  createSchedule(){
    for(var i=0; i<=this.total_time; i++)
    {
      if(this.count_time==13)
      {
        this.count_time = 1;
      }

      if(this.count_time==12)
      {
        this.meridiem = "pm";
      }

      this.schedules.push({"time": this.count_time, "meridiem": this.meridiem});
      this.count_time = this.count_time + 1;
    }
  }

}
