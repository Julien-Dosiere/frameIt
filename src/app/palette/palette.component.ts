import { Component, OnInit } from '@angular/core';
import { PaletteService } from './palette.service';
import {Subscription} from "rxjs";
import {Palette} from "./palette.model";

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {

  palette?: Palette;
  paletteArray?: string[];
  paletteChangeSub?: Subscription;

  constructor(private paletteService: PaletteService) { }

  ngOnInit(): void {
    this.paletteChangeSub = this.paletteService.paletteChanged.subscribe(palette => {
      this.palette = palette
    });
  }

  selectColor(color: string) {
    this.paletteService.selectColor(color);
  }

  pickColor(event: Event) {
    const pickedColor = (<HTMLInputElement>event.target).value;
    this.palette!.custom = pickedColor;
    this.selectColor(pickedColor);
  }

}
