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
  imageSource: string = '/assets/img/img1.jpeg';
  color: string = '#111';
  imgChangeSub?: Subscription;
  paletteSub?: Subscription;
  settingsSub?: Subscription;
  rawSettings: Settings;
  convertedSettings!: Settings;
  @ViewChild('room', { static: true}) room?: ElementRef;

  constructor(
    private imageService: ImageService,
    private paletteService:PaletteService,
    private settingsService:SettingsService,
    ) {
    this.rawSettings = settingsService.settingsChanged.getValue();
    this.convertSettings();
  }

  ngOnInit(): void {
    this.imgChangeSub = this.imageService.imageChanged.subscribe((newSource: string) => this.imageSource = newSource);
    this.paletteSub = this.paletteService.colorChanged.subscribe(color => this.color = color);
    this.settingsSub = this.settingsService.settingsChanged.subscribe(settings => {
      this.rawSettings = settings;
      this.convertSettings();

    });

    this.setScale();

    this.paletteService.setPalette(this.imageSource);



  }

  ngOnDestroy() {
    this.settingsSub!.unsubscribe();
  }


  setScale() {
    // Width of the room image represents 500cm-wide wall
    const scale = parseInt(this.room?.nativeElement.offsetWidth) / 500;
    this.rawSettings.scale = scale;
    this.settingsService.setSettings(this.rawSettings);
  }

  convertSettings(){
    console.log(this.convertedSettings)

    this.convertedSettings = {
      framing: this.scaleValue(this.rawSettings.framing),
      matting: this.scaleValue(this.rawSettings.matting),
      width: this.scaleValue(this.rawSettings.width),
      scale:1
    }
    console.log(this.convertedSettings)
  }

  scaleValue(n: number){
    return n * this.rawSettings.scale;
  }

}
