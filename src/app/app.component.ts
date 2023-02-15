import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {AddPremises} from "../state/favorite.state";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  premises$: Observable<any[]>;

  constructor(private store: Store) {
    this.premises$ = this.store.select(state => state.favorites.premises);
  }

  public ngOnInit(): void {

    this.premises$.subscribe(data => console.log(data));
  }

  public addPremises() {
    const premises = {
      number: 325,
      floor: 7,
      rooms: 2,
    }
    this.store.dispatch(new AddPremises(premises));
  }
}
