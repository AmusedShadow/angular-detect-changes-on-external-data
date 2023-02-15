import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChangeDetectionUtils } from 'src/app/change-detection-utils';

import { WindowAccessor } from '../../../window-ref.factory';
@Component({
  selector: 'rxjs-external-without-patch',
  template: '<div><h3>RXJS External</h3>Value {{ counterValue.value }}</div>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChangeDetectionUtils],
})
export class RxjsExternalWithoutPatch {
  public counterValue = { value: 0 };

  constructor(private winRef: WindowAccessor) {
    winRef.window.ownIntervallSubject.subscribe((val: number) => {
      this.counterValue.value = val;
    });
  }
}
