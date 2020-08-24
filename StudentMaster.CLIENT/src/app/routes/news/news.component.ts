import { Component, OnInit } from '@angular/core';
import { NewsModel } from '@shared/models/news-model';
import { NewsService } from '@shared/services/news.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@shared/services/admin.service';
import { adminRole } from '@shared/config';
import { ShowNewComponent } from './show-new/show-new.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  news: NewsModel[] = [];
  isAdmin = false;
  constructor(
    private newsService: NewsService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.hasRole(adminRole);
  }

  getNews() {
    this.newsService.getNews().subscribe(news => {
      this.news = news;
    });
  }

  openDialog(id: string): void {
    const article = this.news.find(x => x.id === id);
    const dialogRef = this.dialog.open(ShowNewComponent, {
      width: '60%',
      data: article,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getNews();
    });
  }
  addNew() {
    const dialogRef = this.dialog.open(AddNewComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getNews();
    });
  }
}
