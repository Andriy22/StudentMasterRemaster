import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { PreloaderService } from '@core';
import { SwUpdate } from '@angular/service-worker';
import { MtxDialog } from '@ng-matero/extensions';
import { UpdateVersionComponent } from '@shared/components/update-version/update-version.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private preloader: PreloaderService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
