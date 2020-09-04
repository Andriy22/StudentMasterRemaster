import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss'],
})
export class BugReportComponent implements OnInit {
  url = '';
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
