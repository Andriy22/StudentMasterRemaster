import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-500',
  template: `
    <error-code
      code="500"
      [title]="'Сервер вийшов з ладу!'"
      [message]="'Жартую, схоже, у нас є внутрішня проблема, будь ласка, спробуйте оновити.'"
    >
    </error-code>
  `,
})
export class Error500Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
