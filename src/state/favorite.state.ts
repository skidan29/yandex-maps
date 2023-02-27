import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {append, patch, removeItem} from "@ngxs/store/operators";

export class AddPremises {
  static readonly type = '[Favorite] Add Premises';

  constructor(public premises: IPremises) {
  }
}

export class RemovePremises {
  static readonly type = '[Favorite] Remove Premises';

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

  public upgradePremisesInStorage(premisesList: IPremises[]) {
    localStorage.setItem('favorite', JSON.stringify(premisesList));
  }

  @Action(AddPremises)
  addPremises(ctx: StateContext<FavoriteStateModel>, action: AddPremises) {

    ctx.setState(
      patch<FavoriteStateModel>({
        premises: append<IPremises>([action.premises])
      })
    );

    const premisesList = ctx.getState().premises;
    this.upgradePremisesInStorage(premisesList);
  }

  @Action(RemovePremises)
  removeAnimal(ctx: StateContext<FavoriteStateModel>, action: RemovePremises) {

    ctx.setState(
      patch<FavoriteStateModel>({
        premises: removeItem<IPremises>(number => number?.number === action.premisesNumber)
      })
    );

    const premisesList = ctx.getState().premises;
    this.upgradePremisesInStorage(premisesList);
  }

}
