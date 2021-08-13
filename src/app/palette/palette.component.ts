import { Component, OnInit } from '@angular/core';
import { PaletteService } from './palette.service';
import {Subscription} from "rxjs";
import {Palette} from "./palette.model";
import * as namer from 'color-namer';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {

  RGBPalette!: Palette;
  namesPalette!: Palette;
  paletteChangeSub?: Subscription;

  constructor(private paletteService: PaletteService) { }

  ngOnInit(): void {
    this.paletteChangeSub = this.paletteService.paletteChanged.subscribe(palette => {
      this.RGBPalette = palette;
      this.generateNamePalette();
    });
  }

  generateNamePalette(): void {
    this.namesPalette = new Palette(
      this.findColorName(this.RGBPalette!.vibrant),
      this.findColorName(this.RGBPalette!.dark),
      this.findColorName(this.RGBPalette!.muted),
      this.findColorName(this.RGBPalette!.black),
      this.findColorName(this.RGBPalette!.custom),
    )
  }

  findColorName(rgb: string) {
    return namer(rgb).basic[0].name;

  }

  selectColor(color: string) {
    console.log(color)
    this.paletteService.selectColor(color);
  }

  pickColor(event: Event) {
    const pickedColor = (<HTMLInputElement>event.target).value;
    this.RGBPalette!.custom = pickedColor;
    this.namesPalette!.custom = this.findColorName(pickedColor);
    this.selectColor(pickedColor);
  }

}
