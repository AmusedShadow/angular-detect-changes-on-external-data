import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { ClickEvent } from './click-event/click-event.component';
import { InjectableService } from './injectable.service';
import { ComponentInjection } from './component-injection/component-injection.component';

import { WindowAccessor } from './window-ref.factory';
import { AppComponentWithPatch } from './app-with-patch/app.component';
import { AppComponentWithoutPatch } from './app-without-patch/app.component';
import { IntervallSchedulingWithPatch } from './app-with-patch/subcomponents/intervall-scheduling/intervall-scheduling.component';
import { SubcomponentInjectionWithPatch } from './app-with-patch/subcomponents/subcomponent-injection/subcomponent-injection.component';
import { RxjsExternalWithPatch } from './app-with-patch/subcomponents/rxjs-external/rxjs-external.component';
import { AsyncExternalWithPatch } from './app-with-patch/subcomponents/async-pipe/async-external.component';
import { IntervallSchedulingWithoutPatch } from './app-without-patch/subcomponents/intervall-scheduling/intervall-scheduling.component';
import { SubcomponentInjectionWithoutPatch } from './app-without-patch/subcomponents/subcomponent-injection/subcomponent-injection.component';
import { RxjsExternalWithoutPatch } from './app-without-patch/subcomponents/rxjs-external/rxjs-external.component';
import { AsyncExternalWithoutPatch } from './app-without-patch/subcomponents/async-pipe/async-external.component';

@NgModule({
  declarations: [
    AppComponentWithPatch,
    IntervallSchedulingWithPatch,
    SubcomponentInjectionWithPatch,
    RxjsExternalWithPatch,
    AsyncExternalWithPatch,
    AppComponentWithoutPatch,
    IntervallSchedulingWithoutPatch,
    SubcomponentInjectionWithoutPatch,
    RxjsExternalWithoutPatch,
    AsyncExternalWithoutPatch,
    ComponentInjection,
    ClickEvent,
   
  ],
  imports: [BrowserModule],
  providers: [WindowAccessor, InjectableService],
  bootstrap: [AppComponentWithPatch, AppComponentWithoutPatch, ComponentInjection, ClickEvent],
})
export class AppModule {}
