import {
  BreakpointObserver,
  MediaMatcher,
  Breakpoints,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  isHandset!: boolean;
  isHandset$ = new ReplaySubject<boolean>(1);
  constructor(
    public breakpointObserver: BreakpointObserver,
    public media: MediaMatcher
  ) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        this.isHandset = result.matches;
        this.isHandset$.next(result.matches);
      });
  }
}
