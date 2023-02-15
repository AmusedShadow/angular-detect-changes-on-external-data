import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';
import { ChangeDetectionUtils } from 'src/app/change-detection-utils';

@Component({
  selector: 'intervall-scheduling-without-patch',
  template: '<h3>Intervall</h3> Value {{ counterValue.value }}',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChangeDetectionUtils],
})
export class IntervallSchedulingWithoutPatch {
  public counterValue = { value: 0 };

  private source = interval(1000);

  constructor() {
    this.source.subscribe((value) => {
      this.counterValue.value += value;
    });
  }
}
