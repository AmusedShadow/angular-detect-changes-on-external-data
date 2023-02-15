import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WindowAccessor } from '../window-ref.factory';
@Component({
  selector: 'app-root-without-patch',
  template: `Own Value {{ counterValue.value }}

    <sc-injection-without-patch
      [injectedValue]="counterValue"
    ></sc-injection-without-patch>
    <rxjs-external-without-patch></rxjs-external-without-patch>
    <intervall-scheduling-without-patch></intervall-scheduling-without-patch>
    <async-external-without-patch></async-external-without-patch> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponentWithoutPatch {
  public counterValue = { value: 0 };
  constructor(private winRef: WindowAccessor) {
    winRef.window.ownIntervallSubject.subscribe((val: number) => {
      this.counterValue.value = val;
    });
  }
}
