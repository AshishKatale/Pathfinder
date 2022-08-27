import { FC } from 'react';
import './grid.css'
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions, ActionTypes } from './walls';
import { gridCellSideLength } from '../algorithms/helper';
import Cell from './Cell';

interface Props {
  gridWidth: number,
  grid: boolean[],
  disabled: boolean,
}

const Grid: FC<Props> = ({ grid, gridWidth, disabled }) => {
  let dispatch = useDispatch<Dispatch<Actions>>();
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gridWidth},${gridCellSideLength + 2}px)`,
        gridAutoRows: `${gridCellSideLength + 2}px`
      }}
      onDragStart={(e) => {
        if (disabled) return;
        let target = e.target as HTMLDivElement;
        let id = parseInt(target.id);
        if (isNaN(id) === false) {
          grid[id] = true;
          dispatch({ type: ActionTypes.MAKE_WALL, payload: { index: id } })
          target.classList.add("wall-animate");
        }
      }}
      onDragEnter={(e) => {
        if (disabled) return;
        let target = e.target as HTMLDivElement;
        let id = parseInt(target.id);
        if (isNaN(id) === false) {
          grid[id] = true;
          dispatch({ type: ActionTypes.MAKE_WALL, payload: { index: id } })
          target.classList.add("wall-animate");
        }
      }}
      onTouchMove={(e) => {
        if (disabled) return;
        const y = e.changedTouches[0].clientY;
        const x = e.changedTouches[0].clientX;
        const target = document.elementFromPoint(x, y) as HTMLDivElement;
        let id = parseInt(target?.id);
        if (isNaN(id) === false) {
          grid[id] = true;
          dispatch({ type: ActionTypes.MAKE_WALL, payload: { index: id } })
          target.classList.add("wall-animate");
        }
      }}
    >
      {
        grid.map((visited, i) => (
          <Cell key={i} index={i} visited={visited} />
        ))
      }
    </div>
  )
}
export default Grid;