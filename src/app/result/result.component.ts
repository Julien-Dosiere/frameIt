import {Component, OnDestroy, OnInit} from '@angular/core';
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
  framingSub?: Subscription;
  mattingSub?: Subscription;
  framing = 5;
  matting = 1;

  constructor(
    private imageService: ImageService,
    private paletteService:PaletteService,
    private settingsService:SettingsService,
    ) { }

  ngOnInit(): void {
    this.imgChangeSub = this.imageService.imageChanged.subscribe((newSource: string) => this.imageSource = newSource);
    this.paletteSub = this.paletteService.colorChanged.subscribe(color => this.color = color);
    this.framingSub = this.settingsService.framingChanged.subscribe(framing => this.framing = framing);
    this.mattingSub = this.settingsService.mattingChanged.subscribe(matting => this.matting = matting);

    this.paletteService.setPalette(this.imageSource);

  }

  ngOnDestroy() {
    this.imgChangeSub?.unsubscribe();
  }

}
