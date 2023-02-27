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

const getPremisesFromStorage = () => {
  const premisesJson = localStorage.getItem('favorite');
  return premisesJson ? JSON.parse(premisesJson) : [];
}

@State<FavoriteStateModel>({
  name: 'favorites',
  defaults: {
    premises: [
      ...getPremisesFromStorage()
    ],
  }
})
@Injectable()
export class FavoriteState {
  public setPremisesToStorage(premises: IPremises) {
    const premisesList = [...getPremisesFromStorage(), premises];
    localStorage.setItem('favorite', JSON.stringify(premisesList));
  }

  @Action(AddPremises)
  feedAnimals(ctx: StateContext<FavoriteStateModel>, action: AddPremises) {
    const state = ctx.getState();

    ctx.setState({
      premises: [
        ...state.premises,
        action.premises
      ]
    });

    const lastPremises = [...ctx.getState().premises].pop();
    if (lastPremises) {
      this.setPremisesToStorage(lastPremises);
    }

  }

}
