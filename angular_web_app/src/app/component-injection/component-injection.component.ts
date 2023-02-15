import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'comp-injection',
  template:
    '<div> <h3>Component Injection Value</h3> {{ counterValue.value }}</div>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentInjection {
  // This will also not accept any value, cause it is a 'root'-component and the input via attribute is not enabled 
  @Input("injectedValue") set injectedValue(injectedCounterValue: string) {
    console.log(injectedCounterValue);
  }
  public counterValue = { value: 0 };
}
