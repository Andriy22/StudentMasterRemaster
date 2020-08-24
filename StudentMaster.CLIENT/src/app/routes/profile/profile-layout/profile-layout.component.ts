import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { MtxDialog } from '@ng-matero/extensions';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
})
export class ProfileLayoutComponent implements OnInit {
  img = '';
  name = '';
  email = '';
  constructor(public dialog: MtxDialog, public aS: AuthService) {}

  ngOnInit() {
    if (this.aS.loggedIn) {
      this.name = this.aS.getFullName();
      this.email = this.aS.getEmail();
      this.img = 'https://i.ibb.co/yBS5qnQ/logo.png';
    }
  }
  changePhoto() {
    this.dialog.alert('Oops, Буде реалізовано в наступних версіях :(');
    // const selector = document.getElementById('photoSelector') as HTMLInputElement;
    // selector.click();
    // selector.onchange = event => {
    //   const dialogRef = this.dialog.open(CropperComponent, {
    //     width: '60%',
    //     data: event,
    //   });

    //   dialogRef.afterClosed();
    // };
  }
}
