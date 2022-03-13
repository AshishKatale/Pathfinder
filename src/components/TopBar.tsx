import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions, ActionTypes } from '../grid/walls';
import "./topbar.css";


interface Props {
  speed: number;
  disabled: boolean;
  clearWalls: () => void;
  clearGrid: () => void;
  start: () => void;
  changeSpeed: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TopBar: FC<Props> = ({ speed, disabled, changeSpeed, clearWalls, clearGrid, start }) => {
  const dispatch = useDispatch<Dispatch<Actions>>()
  return (
    <div className="topbarcontainer">
      <div className="topbar">
        <div
          className="topbaricon"
          style={{
            backgroundColor: "#74f78b",
          }}
        >
          Unvisited
        </div>
        <div
          className="topbaricon"
          style={{
            color: "azure",
            fontWeight: 'bold',
            backgroundColor: " rgb(198, 115, 253)",
          }}
        >
          Visited
        </div>
        <div
          className="topbaricon"
          style={{
            color: "azure",
            backgroundColor: "red",
          }}
        >
          Unreachable
        </div>
        <div
          className="topbaricon"
          style={{
            backgroundColor: "rgb(255, 174, 0)",
          }}
        >
          Path
        </div>
        <div id="speed-input-container" className="topbaricon">
          <label htmlFor="speed">
            Speed:{" "}
          </label>
          <input
            style={{ cursor: "pointer" }}
            id="speed"
            name="speed"
            type="range"
            onInput={changeSpeed}
            min="0"
            max="150"
            defaultValue={150 - speed}
          />
        </div>
        <button
          className="topbaricon wall"
          disabled={disabled}
          onClick={() => {
            dispatch({ type: ActionTypes.CLEAR_GRID })
            if (clearWalls) clearWalls();
          }}
        >
          Clear Walls
        </button>
        <button
          className="topbaricon reset"
          onClick={clearGrid}
          disabled={disabled}
        >
          Reset Grid
        </button>
        <button
          className="topbaricon reset"
          onClick={start}
          disabled={disabled}
        >
          Animate Path
        </button>
      </div>
    </div>
  );
}

export default TopBar;
