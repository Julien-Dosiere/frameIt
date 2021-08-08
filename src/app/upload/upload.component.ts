import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { ImageService } from '../image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('form', {static: false}) form!: NgForm;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = {
      name: value.name,
      amount: value.amount
    }

    this.form.resetForm();
  }

  onImageChanged(event: Event){
    if ((<HTMLInputElement>event.target).files!.length > 0) {
      this.imageService.setImage((<HTMLInputElement>event.target).files![0]);
    }


  }

}
