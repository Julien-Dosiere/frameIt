import {Component, OnDestroy, OnInit} from '@angular/core';
import { SettingsService } from './settings.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings: Settings;

  settingsSub?: Subscription;


  constructor(private settingsService: SettingsService) {
    this.settings = settingsService.settingsChanged.getValue();
  }

  ngOnInit(): void {
    this.settingsSub = this.settingsService.settingsChanged.subscribe(settings => this.settings = settings);


  }


  setFraming(type: string): void {
    if (type === '+')
      ++this.settings.framing
    else
      --this.settings.framing
    this.settingsService.setSettings(this.settings);
  }

  setMatting(type: string): void {
    if (type === '+')
      ++this.settings.matting
    else
      --this.settings.matting
    this.settingsService.setSettings(this.settings);
  }

  setWidth(event: Event): void {
    const input = (<HTMLInputElement>event.target).value;
    this.settings.width = parseInt(input);
    this.settingsService.setSettings(this.settings);


  }


  ngOnDestroy() {
    this.settingsSub!.unsubscribe();
  }

}
