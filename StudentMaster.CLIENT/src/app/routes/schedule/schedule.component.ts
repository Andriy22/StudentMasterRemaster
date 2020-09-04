import { Component, OnInit } from '@angular/core';
import { ScheduleModel } from '@shared/models/schedule-model';
import { ScheduleService } from '@shared/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = ['pos', 'name'];
  dataSource: any[] = [];
  schedule: ScheduleModel[] = [];
  constructor(private _scheduleService: ScheduleService) {
    this._scheduleService.GetSchedule().subscribe(x => {
      this.schedule = x;
      if (x.length > 0) {
        this.dataSource = x[0].items;
      }
    });
  }
  ngOnInit() {}
  onChange(event: any) {
    this.dataSource = this.schedule[event].items;
  }
}
