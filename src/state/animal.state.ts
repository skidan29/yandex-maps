import { Injectable } from '@angular/core';
import {State, Action, StateContext, Actions} from '@ngxs/store';

export class FeedAnimals {
  static readonly type = '[Zoo] FeedAnimals';
  constructor(public animal: string) {}
}

export interface ZooStateModel {
  animalName: string;
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    animalName: 'Собака'
  }
})
@Injectable()
export class ZooState {
  @Action(FeedAnimals)
  feedAnimals(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      animalName: action.animal
    });
  }
}
