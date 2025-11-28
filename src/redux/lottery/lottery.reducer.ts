import {LotteryActionsType} from './lottery.types';
import {LotteryState} from './lottery-state.interface';

const INITIAL_STATE: LotteryState = {
  // @ts-ignore
  lottery: null
}

export const lotteryReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LotteryActionsType.SET_LOTTERY:
      return {
        ...state,
        lottery: action.payload,
      };
    default:
      return state;
  }
}
