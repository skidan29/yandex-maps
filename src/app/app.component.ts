import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {AddPremises, IPremises} from "../state/favorite.state";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  premises$: Observable<any[]>;
  public form = this.fb.group({
    number: 0,
    floor: 0,
    rooms: 0,
  })

  constructor(private store: Store, private fb: FormBuilder) {
    this.premises$ = this.store.select(state => state.favorites.premises);
  }

  public ngOnInit(): void {
    this.premises$.subscribe(data => console.log(data));
  }

  public addPremises() {
   this.store.dispatch(new AddPremises(this.form.value as IPremises));
  }

}
