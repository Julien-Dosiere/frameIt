import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageFile?: File;
  imageChanged = new Subject<string>();



  constructor() { }

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
        console.log(reader.result);

        if (typeof reader.result === 'string'){
          this.imageChanged.next(reader.result);
        }

      }

    }


  }
}
