import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
} from '@angular/core';
import { ChangeDetectionUtils } from '../change-detection-utils';
@Component({
  selector: 'app-root-with-patch',
  template: `Own Value {{ counterValue.value }}

    <sc-injection-with-patch
      [injectedValue]="counterValue"
    ></sc-injection-with-patch>
    <rxjs-external-with-patch></rxjs-external-with-patch>
    <intervall-scheduling-with-patch></intervall-scheduling-with-patch>
    <async-external-with-patch></async-external-with-patch> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponentWithPatch {
  public counterValue = { value: 0 };
  constructor(cdref: ChangeDetectorRef, apRef: ApplicationRef) {
    setInterval(() => {
      this.counterValue = { value: this.counterValue.value + 1 };
    }, 1000);
  }
}
