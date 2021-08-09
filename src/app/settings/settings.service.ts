import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  framingChanged = new Subject<number>();
  mattingChanged = new Subject<number>();


  constructor() { }

  setFraming(value: number) {
    this.framingChanged.next(value)
  }

  setMatting(value: number) {
    this.mattingChanged.next(value)
  }
}
