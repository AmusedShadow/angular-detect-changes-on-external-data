import { interval, Observable, tap } from "rxjs";

//emit value in sequence every 1 second
var source = interval(1000);

// @ts-ignore
window.ownIntervallSubject = source.pipe(
  tap((value: number) => {
    const element = document.getElementById("comInject") as any;
    element.injectedValue = value;
  })
);
// @ts-ignore

(window.ownIntervallSubject as Observable<number>).subscribe();
