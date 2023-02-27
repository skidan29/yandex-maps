import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {patch, removeItem} from "@ngxs/store/operators";

export class AddPremises {
  static readonly type = '[Favorite] Add Premises';

  constructor(public premises: IPremises) {
  }
}

export class RemovePremises {
  static readonly type = '[Favorite] remove Premises';

  constructor(public premisesNumber: number) {
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
  addPremises(ctx: StateContext<FavoriteStateModel>, action: AddPremises) {
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

  @Action(RemovePremises)
  removeAnimal(ctx: StateContext<FavoriteStateModel>, premisesNumber: RemovePremises) {

      ctx.setState(
        patch<FavoriteStateModel>({
          premises: removeItem<IPremises>(number => number?.number === premisesNumber.premisesNumber)
        })
      );
  }

}
