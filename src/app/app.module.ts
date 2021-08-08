import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import {FormsModule} from "@angular/forms";
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
