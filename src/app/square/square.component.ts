import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
      <button type="button border border-primary rounded" class="btn btn-light">{{value}}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 8em !important; }']
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | undefined;
}
