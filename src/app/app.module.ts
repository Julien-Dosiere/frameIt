import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import {FormsModule} from "@angular/forms";
import { ResultComponent } from './result/result.component';
import { PaletteComponent } from './palette/palette.component';
import { SettingsComponent } from './settings/settings.component';
import { ColorComponent } from './palette/color/color.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ResultComponent,
    PaletteComponent,
    SettingsComponent,
    ColorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
