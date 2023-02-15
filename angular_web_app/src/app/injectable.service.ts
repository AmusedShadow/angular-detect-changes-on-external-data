import { Injectable } from '@angular/core';
import { interval, Observable, tap } from 'rxjs';

import { WindowAccessor } from './window-ref.factory';

@Injectable({
  providedIn: 'root',
})
export class InjectableService {
  public externalEmitter$: Observable<number>;
  public internalEmitter$ = interval(1000).pipe(
    tap((value: number) => console.log('internalEmitter', value))
  );
  constructor(private winRef: WindowAccessor) {
    this.externalEmitter$ = winRef.window.ownIntervallSubject;
  }
}
