import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  imageSource: string = '';

  imgChangeSub?: Subscription;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imgChangeSub = this.imageService.imageChanged.subscribe((newSource: string) => this.imageSource = newSource)

  }

}
