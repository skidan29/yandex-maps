import {Component, OnInit} from '@angular/core';
import { Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {FeedAnimals} from "../state/animal.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  animals$: Observable<string[]>;

  constructor(private store: Store) {
    this.animals$ = this.store.select(state => state.zoo.animalName);
  }

  public ngOnInit(): void {
    setTimeout(()=>this.store.dispatch(new FeedAnimals('Кошка')),2000);
    this.animals$.subscribe(data=>console.log(data));
  }

}
