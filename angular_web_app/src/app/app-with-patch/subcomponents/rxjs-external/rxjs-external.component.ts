import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChangeDetectionUtils } from 'src/app/change-detection-utils';

import { WindowAccessor } from '../../../window-ref.factory';
@Component({
  selector: 'rxjs-external-with-patch',
  template: '<div><h3>RXJS External</h3>Value {{ counterValue.value }}</div>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // In order for Angular to inject the ChangeDetectorRef of the component into the ChaneDetectionUtils,
  // each component that wants to use the utils must provoke them itself.
  providers: [ChangeDetectionUtils],
})
export class RxjsExternalWithPatch {
  public counterValue = { value: 0 };

  // Inject WindowAccessors as winRef to access window.<xxx>.
  // Inject the ChangeDetectionUtils
  constructor(
    private winRef: WindowAccessor,

    private changeDetectionUtils: ChangeDetectionUtils
  ) {
    // Generates the operator that triggers the unsubscribe() when the component is destroyed,
    // and on the other hand the changeDetection, as soon as a next is fired.
    const changeDetectOperator = changeDetectionUtils.createRxjsOperator();
    // Accessing the interval emitter
    winRef.window.ownIntervallSubject
      // The generated operator is registered in the pipe
      .pipe(changeDetectOperator)
      .subscribe((val: number) => {
        this.counterValue.value = val;
      });
  }
}
