import { createStore, Reducer } from 'redux';

export enum ActionTypes { RESIZE_GRID, CLEAR_GRID, MAKE_WALL }

export type Actions = {
  type: ActionTypes.RESIZE_GRID,
  payload: {
    size: number
  }
} | {
  type: ActionTypes.MAKE_WALL,
  payload: {
    index: number
  }
} | {
  type: ActionTypes.CLEAR_GRID
}

const Walls: Reducer<boolean[], Actions> = (state = [], action: Actions) => {
  switch (action.type) {
    case ActionTypes.CLEAR_GRID:
      return new Array(state.length).fill(false);
    case ActionTypes.RESIZE_GRID:
      return new Array(action.payload.size).fill(false);
    case ActionTypes.MAKE_WALL:
      state[action.payload.index] = true;
      return state;
    default:
      return state;
  }
}

const store = createStore(Walls);

export default store;