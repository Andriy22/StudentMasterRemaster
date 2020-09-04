import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { userRole, teacherRole, adminRole } from '@shared/config';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-check-browser',
  templateUrl: './check-browser.component.html',
  styleUrls: ['./check-browser.component.scss'],
})
export class CheckBrowserComponent implements OnInit {
  timer = 0;
  msg: BehaviorSubject<string> = new BehaviorSubject<string>('Привіт!');

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.timer += 0.05;

      if (this.timer >= 15 && this.timer <= 16) {
        this.msg.next('Налаштування системи...');
      }

      if (this.timer >= 60 && this.timer <= 61) {
        this.msg.next('Перевірка авторизації...');
      }

      if (this.timer >= 80 && this.timer <= 81) {
        this.timer = 82;
        this.auth.checkAuth().subscribe(
          _ => {
            this.timer = 100;
            this.msg.next('Готово!');
            clearInterval(interval);

            setTimeout(() => {
              if (this.auth.hasRole(userRole)) {
                this.router.navigate(['dashboard']);
              } else if (this.auth.hasRole(teacherRole)) {
                this.router.navigate(['teacher/dashboard']);
              } else if (this.auth.hasRole(adminRole)) {
                this.router.navigate(['admin/classes']);
              }
            }, 1000);
          },
          _ => {
            this.msg.next('Помилка авторизації!');
            clearInterval(interval);
          }
        );
      }
    }, 1);
  }
}
