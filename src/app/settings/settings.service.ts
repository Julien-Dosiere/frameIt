import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    framing: 5,
    matting: 1,
    imageWidth: 80,
  }
  settingsChanged = new BehaviorSubject<Settings>(this.settings);
  imageHeightChanged = new BehaviorSubject<number>(80);



  constructor() { }



  setSettings(settings: Settings) {
    this.settings = settings;
    this.settingsChanged.next(settings);
  }

  setImageHeight(imageHeight: number) {
    this.imageHeightChanged.next(imageHeight);
  }

}
