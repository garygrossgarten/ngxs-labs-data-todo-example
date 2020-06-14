import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { NgxsModule } from "@ngxs/store";
import { AppState } from "./app.state";
import { NgxsDataPluginModule } from "@ngxs-labs/data";
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
