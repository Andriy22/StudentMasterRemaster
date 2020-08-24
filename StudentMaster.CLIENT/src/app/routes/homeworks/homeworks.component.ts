import { Component, OnInit } from '@angular/core';
import { Homework } from '@shared/models/homework';
import { HomeworksService } from '@shared/services/homeworks.service';
import { ToolsService } from '@shared/services/tools.service';
import { IMG_API } from '@shared/config';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.scss'],
})
export class HomeworksComponent implements OnInit {
  homeworks: Homework[] = [];
  types: string[] = ['Відкриті', 'На перевірці', 'Закриті'];
  selectedType = 'Відкриті';
  fileAPI = IMG_API;
  constructor(private hS: HomeworksService, private tools: ToolsService) {}
  ngOnInit() {
    this.hS.getMyHomeworksRedux().subscribe(x => {
      this.homeworks = x.filter(x => x.status === this.selectedType);
    });
  }
  onChange(event) {
    this.selectedType = this.types[event];
    this.hS.getMyHomeworksRedux().subscribe(x => {
      this.homeworks = x.filter(x => x.status === this.types[event]);
    });
  }

  remove(id) {
    this.hS.removeMyHomework(id).subscribe(() => {
      this.tools.showNotification('Success');
      this.hS.getMyHomeworksRedux().subscribe(x => {
        this.homeworks = x.filter(x => x.status === this.selectedType);
      });
    });
  }
  upload(id) {
    const selector = document.getElementById('fileSelector') as HTMLInputElement;
    selector.click();
    selector.onchange = (event: any) => {
      console.log(event.target.files[0].type);
      if (
        !event.target.files[0].type.indexOf('image') ||
        !event.target.files[0].type.indexOf('text/plain')
      ) {
        const formdata = new FormData();
        formdata.append('Id', id);
        formdata.append('file', event.target.files[0]);

        this.hS.doHomeWorkAsync(formdata).subscribe(() => {
          this.tools.showNotification('Success');
          this.hS.getMyHomeworksRedux().subscribe(x => {
            this.homeworks = x.filter(x => x.status === this.selectedType);
          });
        });
      } else {
        this.tools.showNotification('Please select valid file');
      }
    };
  }
}
