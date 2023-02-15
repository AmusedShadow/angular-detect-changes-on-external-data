import { Injectable } from '@angular/core';

function _getWindow(): any {
  return window;
}

@Injectable()
export class WindowAccessor {
  get window(): any {
    return _getWindow();
  }
}
