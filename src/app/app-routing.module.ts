import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FirstPageComponent} from "../pages/first/firstPage.component";
import {YandexMapsComponent} from "../pages/yandex-maps/yandex-maps.component";

const routes: Routes = [
  {path:'first', component: FirstPageComponent},
  {path:'yandex-maps', component: YandexMapsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
