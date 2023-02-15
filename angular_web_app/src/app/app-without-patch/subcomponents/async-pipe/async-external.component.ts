import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { WindowAccessor } from '../../../window-ref.factory';
@Component({
  selector: 'async-external-without-patch',
  template: '<div><h3>Async External</h3>Value {{subscribable | async }}</div>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncExternalWithoutPatch {
  public subscribable: Observable<number>;

  constructor(private winRef: WindowAccessor) {
    this.subscribable = winRef.window.ownIntervallSubject;
  }
}
