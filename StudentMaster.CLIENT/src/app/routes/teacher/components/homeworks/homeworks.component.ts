import { Component, OnInit } from '@angular/core';
import { TeacherHomework } from '@shared/models/teacherhomework.model';
import { HomeworksService } from '@shared/services/homeworks.service';
import { ToolsService } from '@shared/services/tools.service';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.scss'],
})
export class HomeworksComponent implements OnInit {
  homeworks: TeacherHomework[] = [];
  file_url = '';
  constructor(private hs: HomeworksService, private tools: ToolsService) {}

  ngOnInit(): void {
    this.hs.getTeacherHomeworks().subscribe(data => {
      this.homeworks = data;
    });
  }
  changeSelection(id, event) {
    this.hs.reviewHomeWork(id, event.value).subscribe(() => {
      this.tools.showNotification('Success');
    });
  }
}
