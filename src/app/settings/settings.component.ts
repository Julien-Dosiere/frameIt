import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  framing = 5;
  matting = 1;

  framingSub?: Subscription;
  MattingSub?: Subscription;


  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.framingSub = this.settingsService.framingChanged.subscribe(framing => this.framing = framing)
    this.MattingSub = this.settingsService.mattingChanged.subscribe(matting => this.matting = matting)


  }


  setFraming(type: string): void {
    if (type === '+')
      this.settingsService.setFraming(++this.framing);
    else
      this.settingsService.setFraming(--this.framing);
  }

  setMatting(type: string): void {
    if (type === '+')
      this.settingsService.setMatting(++this.matting);
    else
      this.settingsService.setMatting(--this.matting);
  }

}
