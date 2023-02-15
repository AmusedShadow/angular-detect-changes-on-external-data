/**
 * Example of usage
 *
 * import { ChangeDetectionStrategy, Component } from '@angular/core';
 * import { interval } from 'rxjs';
 * import { ChangeDetectionUtils } from 'src/app/asyncRxjs.pipe';
 *
 * @Component({
 *  selector: 'intervall-scheduling',
 *  template: '<h1>Intervall</h1> Value {{ counterValue.value }}',
 *  styles: [],
 *  changeDetection: ChangeDetectionStrategy.OnPush,
 *  providers: [ChangeDetectionUtils],
 * })
 *export class IntervallScheduling {
 *  public counterValue = { value: 0 };
 *
 *  private source = interval(1000);
 *
 *  constructor(changeDetectionUtils: ChangeDetectionUtils) {
 *    const changeDetectOperator = changeDetectionUtils.createRxjsOperator();
 *    this.source.pipe(changeDetectOperator).subscribe((value) => {
 *      this.counterValue.value += value;
 *    });
 *  }
 *}
 */

import {
  ChangeDetectorRef,
  HostListener,
  Inject,
  Injectable,
  OnDestroy,
} from '@angular/core';

import { merge, Observable, Subject, Subscriber, takeUntil } from 'rxjs';

@Injectable()
export class ChangeDetectionUtils implements OnDestroy {
  /**
   * Internal _destroy$ emitter. On ngOnDestroy or manual call to dispose() it emits.
   * This will unsubscribe the changeDetector.
   */
  private _destroy$ = new Subject<void>();

  /**
   * Can be called manually. If used manually, please provide a destroy$ within factoryRxjsOperator().
   * ngOnDestroy will not work because Angular does not generate and
   * cannot handle the onDestroy event for the instance.
   * @param _changeDetectorRef ChangeDetectorRef that get called in case of registered emit
   */
  constructor(
    @Inject(ChangeDetectorRef) private _changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * ngOnDestroy is not reliably called in the following scenarios
   * - page refresh
   * Close tab
   * Close browser
   * Navigation away from page
   *
   * So a HostListener has to be registered to window:beforeunload.
   * This will also unsubscribe in case of the above scenarios
   */
  @HostListener('window:beforeunload')
  public dispose(): void {
    this.ngOnDestroy();
  }

  /**
   * ng Live Cycle Hook
   * This works properly by injecting an instance of ChangeDetectionUtils into the component.
   * If you have instantiated ChangeDetectionUtils yourself using `new' then
   * Angular will not call this at all.
   */
  public ngOnDestroy(): void {
    this._destroy$.next();
  }

  /**
   * This creates an rxjs operator. This operator can be used within the rxjs pipe function.
   * In case of an emit on the rxjs pipe, the operator will perform a markForCheck() on known ChangeDetectorRef.
   * This will update the component view without using Angular AsyncPipe.
   * @param ownDestroy$ - Optional parameter. Operator will unsubscribe if this is emitted.
   * @returns rxjs Operator function
   */
  public createRxjsOperator(
    ownDestroy$?: Observable<any>
  ): <T>(source: Observable<T>) => Observable<T> {
    // need to be moved in function scope to be available within operator function
    const changeRef = this._changeDetectorRef;
    // merge internal and external destroy$ so both will also work together
    const destroy$ = merge(ownDestroy$ ?? new Observable(), this._destroy$);

    const rxjsOperatorFunc = function <T>(
      source: Observable<T>
    ): Observable<T> {
      return new Observable((subscriber: Subscriber<T>) => {
        // subscribe and use takeUntil to unsubscribe in case destroy$ emits
        source.pipe(takeUntil(destroy$)).subscribe({
          next: (value: T) => {
            // Trigger ChangeDetection
            changeRef.markForCheck();
            changeRef.detectChanges();
            subscriber.next(value);
          },
          error: (err: any) => {
            // Trigger ChangeDetection
            changeRef.markForCheck();
            subscriber.error(err);
          },
          complete: () => {
            // Trigger ChangeDetection
            changeRef.markForCheck();
            subscriber.complete();
          },
        });
      });
    };

    return rxjsOperatorFunc.bind(this);
  }
}
