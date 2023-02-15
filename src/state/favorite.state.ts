import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';

export class AddPremises {
  static readonly type = '[Favorite] Add Premises';

  constructor(public premises: IPremises) {
  }
}

export interface IPremises {
  number: number;
  floor: number;
  rooms: number;
}

export interface FavoriteStateModel {
  premises: IPremises[];
}

@State<FavoriteStateModel>({
  name: 'favorites',
  defaults: {
    premises: [],
  }
})
@Injectable()
export class FavoriteState {
  @Action(AddPremises)
  feedAnimals(ctx: StateContext<FavoriteStateModel>, action: AddPremises) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      premises: [
        ...state.premises,
        action.premises
      ]
    });
  }
}
