import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import { PaletteService } from './palette/palette.service';








@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageFile?: File;
  imageChanged = new BehaviorSubject<string>('/assets/img/img1.jpeg');




  constructor(private paletteService: PaletteService) {
  }

  setImage (file: File) {
    this.imageFile = file;
    console.log(`filename: ${this.imageFile.name}`)

    this.getImage()
  }

  getImage() {
    if (this.imageFile){
      const reader = new FileReader();


      reader.readAsDataURL(this.imageFile);

      reader.onload = () => {
        if (typeof reader.result === 'string'){
          this.imageChanged.next(reader.result);
          this.paletteService.setPalette(reader.result);



        }
 // is the data URL because called with readAsDataURL

      }
    }

  }




}
