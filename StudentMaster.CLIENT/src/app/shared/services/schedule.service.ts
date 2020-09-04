import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScheduleItem, ScheduleModel } from '../models/schedule-model';
import { HttpClient } from '@angular/common/http';
import { API } from '../config';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  Schedule: BehaviorSubject<ScheduleModel[]>;
  constructor(private http: HttpClient, private Spinner: NgxSpinnerService) {
    this.Schedule = new BehaviorSubject([]);
  }
  GetSchedule() {
    return this.http.get<ScheduleModel[]>(API + '/api/Class/get-schedule');
  }
}
