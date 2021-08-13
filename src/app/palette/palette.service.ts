import { Injectable } from '@angular/core';
import Vibrant from "node-vibrant/dist/vibrant.js";

import { Palette as ExtractedPalette}  from '@vibrant/color';
import {Subject} from "rxjs";
import { Palette } from './palette.model';


@Injectable({
  providedIn: 'root'
})
export class PaletteService {
  private palette?: Palette;
  paletteChanged = new Subject<Palette>();
  colorChanged = new Subject<string>();


  constructor() {

  }

  setPalette(url: string) {
    Vibrant.from(url).getPalette().then((extractedPalette: ExtractedPalette) => {
      this.palette = new Palette(
        this.colorConverter(extractedPalette.Vibrant!.rgb),
        this.colorConverter(extractedPalette.DarkVibrant!.rgb),
        this.colorConverter(extractedPalette.Muted!.rgb),
      );
      this.paletteChanged.next(this.palette);
      this.colorChanged.next(this.palette.vibrant);


    })
  }

  colorConverter (rgb: [number, number, number]) {
    const red = this.rgbToHex(rgb[0]);
    const green = this.rgbToHex(rgb[1]);
    const blue = this.rgbToHex(rgb[2]);
    return '#'+red+green+blue;
  };

  rgbToHex(ref: number) {
    var hex = Number(Math.round(ref)).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  selectColor(color: string) {
    this.colorChanged.next(color);
  }







}
