import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="#/">
      <span style="font-size: 20px" class="matero-branding-name">
        StudentMaster
        <sup
          ><small>#1.0.2 <b>PRE</b>RELEASE</small></sup
        ></span
      >
    </a>
  `,
})
export class BrandingComponent {}
