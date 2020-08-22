import { Component, OnInit } from '@angular/core';
import { AvarageMarks } from '@shared/models/average-marks';
import { MarksService } from '@shared/services/marks.service';

@Component({
  selector: 'app-avarage-marks',
  templateUrl: './avarage-marks.component.html',
  styleUrls: ['./avarage-marks.component.scss'],
})
export class AvarageMarksComponent implements OnInit {
  marks: AvarageMarks[] = [];
  constructor(private marksService: MarksService) {}

  ngOnInit(): void {
    this.marksService.getAverageMarks().subscribe(
      (data: AvarageMarks[]) => {
        this.marks = data;
      },
      () => {}
    );
  }
}
