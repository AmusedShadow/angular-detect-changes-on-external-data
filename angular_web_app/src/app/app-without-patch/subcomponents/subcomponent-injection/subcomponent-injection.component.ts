import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sc-injection-without-patch',
  template:
    '<div> <h3>Subcomponent Injection Value</h3> {{ counterValue.value }}</div>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcomponentInjectionWithoutPatch {
  @Input() set injectedValue(injectedCounterValue: { value: number }) {
    this.counterValue.value = injectedCounterValue.value;
  }
  public counterValue = { value: 0 };
}
