import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ImageService } from '../image.service';
import {Subscription} from "rxjs";
import {PaletteService} from "../palette/palette.service";
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  imageSource: string;
  color: string = '#111';
  imgChangeSub?: Subscription;
  paletteSub?: Subscription;
  settingsSub?: Subscription;
  rawSettings: Settings;
  convertedSettings!: Settings;
  roomView = true;
  scale!: number;
  @ViewChild('view', { static: true}) view?: ElementRef;

  constructor(
    private imageService: ImageService,
    private paletteService:PaletteService,
    private settingsService:SettingsService,
    ) {

    this.rawSettings = settingsService.settingsChanged.getValue();
    this.imageSource = this.imageService.imageChanged.getValue();
  }

  ngOnInit(): void {
    this.imgChangeSub = this.imageService.imageChanged.subscribe((newSource: string) => this.imageSource = newSource);
    this.paletteSub = this.paletteService.colorChanged.subscribe(color => this.color = color);
    this.settingsSub = this.settingsService.settingsChanged.subscribe(settings => {
      this.rawSettings = settings;
      this.setScale();
    });



    this.paletteService.setPalette(this.imageSource);
  }

  ngOnDestroy() {
    this.settingsSub!.unsubscribe();
  }


  setScale() {
    // Width of the room image represents 500cm-wide wall
    let containerRealSize: number;
    if (this.roomView)
      containerRealSize = 500;
    else
      containerRealSize = this.rawSettings.width;

    this.scale = parseInt(this.view!.nativeElement.offsetWidth) / containerRealSize;
    this.convertSettings()

      //this.rawSettings.scale = scale;
    //this.settingsService.setSettings(this.rawSettings);
  }

  convertSettings(){

    this.convertedSettings = {
      framing: this.scaleValue(this.rawSettings.framing),
      matting: this.scaleValue(this.rawSettings.matting),
      width: this.scaleValue(this.rawSettings.width),
    }
  }

  scaleValue(n: number){
    return n * this.scale;
  }

  setRoomView() {
    this.roomView = true;
  }

  setCloseUp() {
    this.roomView = false;
  }

}
