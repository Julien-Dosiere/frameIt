import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    framing: 5,
    matting: 1,
    width: 80,
    scale: 200,
  }
  settingsChanged = new BehaviorSubject<Settings>(this.settings);


  constructor() { }



  setSettings(settings: Settings) {
    this.settings = settings;
    this.settingsChanged.next(settings);
  }
}
