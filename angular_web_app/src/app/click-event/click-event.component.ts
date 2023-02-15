import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'click-event',
  template: `<div>
    <h3>Click Event Value</h3>
    {{ counterValue.value }}
    <button (click)="onClick()">Inc Value</button>
  </div> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickEvent {
  public counterValue = { value: 0 };

  constructor() {}
  public onClick() {
    this.counterValue.value += 1;
  }
}
