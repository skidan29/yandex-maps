import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import {NgxsModule} from "@ngxs/store";
import {ZooState} from "../state/animal.state";
import {FirstPageComponent} from "../pages/first/firstPage.component";
import {YandexMapsComponent} from "../pages/yandex-maps/yandex-maps.component";


const COMPONENTS = [
  FirstPageComponent,
  YandexMapsComponent
]

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularYandexMapsModule.forRoot({}),
    NgxsModule.forRoot([ZooState], {
      developmentMode: true
    }),
  ],
  exports: [...COMPONENTS],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
