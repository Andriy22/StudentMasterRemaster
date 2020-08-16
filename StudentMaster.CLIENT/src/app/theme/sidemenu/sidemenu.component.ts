import { Component, Input } from '@angular/core';
import { MenuService, Menu } from '@core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  allRoutes = this._menu.getAll();
  menus: Menu[] = [];

  constructor(private _menu: MenuService, private _auth: AuthService) {}

  ngOnInit(): void {
    this.allRoutes.subscribe(routs => {
      routs.forEach(rout => {
        if (rout.roles && rout.roles.length > 0) {
          rout.roles.forEach(role => {
            if (
              this._auth.hasRole(role) &&
              this.menus.findIndex(x => x.name === rout.name) === -1
            ) {
              console.log(rout);
              this.menus.push(rout);
            }
          });
        } else {
          this.menus.push(rout);
        }
      });
    });
  }

  // Delete empty values and rebuild route
  buildRoute(routes: string[]) {
    let route = '';
    routes.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }
}
