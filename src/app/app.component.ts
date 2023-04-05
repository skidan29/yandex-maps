import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {AddPremises} from "../state/favorite.state";
import {FormBuilder, FormGroup} from "@angular/forms";
//test Decorators
const logClass = (constructor: Function) => {
  console.log(constructor);
}

const logProperty = (target:Object, propertyKey: string | symbol): any  => {
  return {
    writable: false,
    value: 'зачение поля'
  };
}


const logMethod = (target:Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
  console.log(propertyKey, target,);
}
////

class Example {
  @logProperty
  public name?: string;

  constructor() {
    this.name = 'значене класса';
    console.log(this.name)
  }
}

let newClass = new Example();
import {AddPremises, IPremises} from "../state/favorite.state";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  premises$: Observable<any[]>;
  public form?: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
  constructor(private store: Store, private fb: FormBuilder) {
    this.premises$ = this.store.select(state => state.favorites.premises);
  }

  public ngOnInit(): void {
    this.initForm();
    this.premises$.subscribe(data => console.log(data));
  }

  @logMethod
  private initForm() {

    this.form = this.fb.group({
      name: 'ddrd',
      age: '30',
    })
  }

  public showValue() {
    console.log(this.form?.value);
  }

  public addPremises() {
   this.store.dispatch(new AddPremises(this.form.value as IPremises));
  }

}
