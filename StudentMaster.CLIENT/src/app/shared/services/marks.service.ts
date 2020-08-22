import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './../config';
import { ShowMarkModel } from '@shared/models/showMarksModel';
import { marksForChartResult } from '@shared/models/markForChart';
import { AvarageMarks } from '@shared/models/average-marks';

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  constructor(private http: HttpClient) {}

  getMyMarksByDate(date: any) {
    return this.http.get<ShowMarkModel[]>(API + '/api/Marks/get-my-marks-by-date/' + date);
  }
  getMyMarkForChart() {
    return this.http.get<marksForChartResult>(API + '/api/Marks/get-marks-for-chart');
  }
  getAverageMarks() {
    return this.http.get<AvarageMarks[]>(API + '/api/Marks/get-avarage-marks');
  }
}
