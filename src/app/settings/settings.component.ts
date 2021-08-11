import {Component, OnDestroy, OnInit} from '@angular/core';
import { SettingsService } from './settings.service';
import {Subscription} from "rxjs";
import {ImageService} from "../image.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings: Settings;
  imageSub?: Subscription;
  settingsSub?: Subscription;
  heightRatio: number = 1;
  dimensions = {imageHeight: 0, totalWidth: 0, totalHeight: 0};


  constructor(
    private settingsService: SettingsService,
    private imageService: ImageService
    ) {
    this.settings = settingsService.settingsChanged.getValue();
  }

  ngOnInit(): void {
    this.settingsSub = this.settingsService.settingsChanged.subscribe(settings => {
      this.settings = settings;
      this.setDimensions();
    });
    this.imageSub = this.imageService.imageChanged.subscribe(imageUrl => this.getImageSize(imageUrl));

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

  getImageSize(imageUrl: string) {
    const img = new Image;

    img.onload = () => {
      this.heightRatio = img.height / img.width;
      this.setDimensions();
    };
    img.src = imageUrl;
  }

  setDimensions() {
    this.dimensions.imageHeight = Math.round(this.settings.width * this.heightRatio);
    this.dimensions.totalHeight = this.dimensions.imageHeight + (this.settings.matting + this.settings.framing) * 2;
    this.dimensions.totalWidth = this.settings.width + (this.settings.matting + this.settings.framing) * 2;
  }

}
