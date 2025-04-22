import {createSelector} from 'reselect';
import {RootState} from '../root-state.interface';

const lotterySelector = (state: RootState) => state.lottery;

export const selectLottery = createSelector(
  [lotterySelector],
  state => state.lottery
)
