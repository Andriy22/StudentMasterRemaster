import { Component, OnInit } from '@angular/core';
import { ScheduleModel } from '@shared/models/schedule-model';
import { ScheduleService } from '@shared/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'start', 'end'];
  dataSource: any[] = [];
  schedule: ScheduleModel[] = [];
  constructor(private _scheduleService: ScheduleService) {
    this._scheduleService.GetSchedule();
    this._scheduleService.Schedule.subscribe(x => {
      this.schedule = x;
    });
  }
  ngOnInit() {
    // this.dataSource = this.Schedule.;
  }
  onChange(event: any) {
    this.dataSource = this.schedule[event].items;
  }
}
