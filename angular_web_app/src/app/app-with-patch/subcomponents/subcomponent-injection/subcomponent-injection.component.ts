import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sc-injection-with-patch',
  template:
    '<div> <h3>Subcomponent Injection Value</h3> {{ counterValue.value }}</div>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcomponentInjectionWithPatch {
  @Input() set injectedValue(injectedCounterValue: { value: number }) {
    this.counterValue.value = injectedCounterValue.value;
  }
  public counterValue = { value: 0 };
}
