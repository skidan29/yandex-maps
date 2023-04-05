import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import {NgxsModule} from "@ngxs/store";
import {FirstPageComponent} from "../pages/first/firstPage.component";
import {YandexMapsComponent} from "../pages/yandex-maps/yandex-maps.component";
import {FavoriteState} from "../state/favorite.state";
import { CustomInputComponent } from './custom-input/custom-input.component';
import {ReactiveFormsModule} from "@angular/forms";


const COMPONENTS = [
  FirstPageComponent,
  YandexMapsComponent
]

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    CustomInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularYandexMapsModule.forRoot({}),
    NgxsModule.forRoot([FavoriteState], {
      developmentMode: true
    }),
    ReactiveFormsModule,
  ],
  exports: [...COMPONENTS],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
