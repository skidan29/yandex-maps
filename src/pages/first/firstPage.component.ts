import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {IPremises, RemovePremises} from "../../state/favorite.state";

@Component({
  selector: 'app-root',
  templateUrl: './firstPage.component.html',
  styleUrls: ['./firstPage.component.scss']
})
export class FirstPageComponent {
  premises$: Observable<IPremises[]>;

  constructor(private store: Store) {
    this.premises$ = this.store.select(state => state.favorites.premises);
  }

  public removePremises(premisesNumber:number){
    this.store.dispatch(new RemovePremises(premisesNumber));
  }

}
