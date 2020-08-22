import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="#/">
      <span class="matero-branding-name">
        StudentMaster
        <sup
          ><small><i>#1.0.1 ALPHA</i></small></sup
        ></span
      >
    </a>
  `,
})
export class BrandingComponent {}
