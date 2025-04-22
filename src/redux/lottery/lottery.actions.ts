import {LotteryActionsType} from './lottery.types';

export const setLottery = (lottery: any) => ({
  type: LotteryActionsType.SET_LOTTERY,
  payload: lottery
})
