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
  @ViewChild('room', { static: true}) room?: ElementRef;

  constructor(
    private imageService: ImageService,
    private paletteService:PaletteService,
    private settingsService:SettingsService,
    ) {
    this.rawSettings = settingsService.settingsChanged.getValue();
  }

  ngOnInit(): void {
    this.imgChangeSub = this.imageService.imageChanged.subscribe((newSource: string) => this.imageSource = newSource);
    this.paletteSub = this.paletteService.colorChanged.subscribe(color => this.color = color);
    this.settingsSub = this.settingsService.settingsChanged.subscribe(settings => {

    });

    this.paletteService.setPalette(this.imageSource);
    this.rawSettings.scale = this.room?.nativeElement.offsetWidth;
    this.settingsService.setSettings(this.rawSettings);


  }

  ngOnDestroy() {
    this.settingsSub!.unsubscribe();
  }

  onResize(event: Event) {
    console.log(this.room?.nativeElement.offsetWidth);

  }

}
