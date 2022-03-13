import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '../grid/Grid';
import TopBar from '../components/TopBar';
import { wait, directions, clearGrid, isValidCell, clearWalls, neighbours } from './helper';
import useMount from '../hooks/useMount';
import useGridRefs from '../hooks/useGridRefs';
import useGridDimensions from '../hooks/useGridDimensions';

let halt = false;
let speed = 75;

async function visit(cellId: number) {
  await wait(speed);
  if (halt) return;
  let cell = document.getElementById(`${cellId}`);
  if (!cell) return;
  cell.classList.add("visit-animate");
}

async function bidirectional(
  gridSource: boolean[],
  gridDest: boolean[],
  parentSource: number[],
  parentDest: number[],
  gridWidth: number,
  gridHeight: number,
  source: number,
  dest: number,
  intersection: { value: number }
) {
  let visitedCells = [];
  if (gridSource[source] === false) {
    let fromSource: number[] = [],
      fromDest: number[] = [];
    fromSource.push(source);
    fromDest.push(dest);

    gridSource[source] = true;
    gridDest[dest] = true;
    while (fromSource.length > 0 && fromDest.length > 0) {
      if (halt) return false;
      let next = fromSource.shift()!;
      if (visitedCells.indexOf(next) === -1) visitedCells.push(next);
      else {
        intersection.value = next;
        return true;
      }
      await visit(next);
      let i = Math.floor(next / gridWidth);
      let j = next % gridWidth;
      for (let c = 0; c < neighbours; c++) {
        let d = directions[c];
        let x = i + d.x;
        let y = j + d.y;
        let validCell = await isValidCell(x, y, gridWidth, gridHeight);
        if (validCell) {
          next = x * gridWidth + y;
          if (gridSource[next] === false) {
            fromSource.push(next);
            parentSource[next] = i * gridWidth + j;
            gridSource[next] = true;
          }
        }
      }

      next = fromDest.shift()!;
      if (visitedCells.indexOf(next) === -1) visitedCells.push(next);
      else {
        intersection.value = next;
        return true;
      }
      await visit(next);
      i = Math.floor(next / gridWidth);
      j = next % gridWidth;
      for (let c = 0; c < neighbours; c++) {
        let d = directions[c];
        let x = i + d.x;
        let y = j + d.y;
        let is = await isValidCell(x, y, gridWidth, gridHeight);
        if (is) {
          next = x * gridWidth + y;
          if (gridDest[next] === false) {
            fromDest.push(next);
            parentDest[next] = i * gridWidth + j;
            gridDest[next] = true;
          }
        }
      }
    }
    return false;
  }
  return false;
}


async function drawPath(
  parentSource: number[],
  parentDest: number[],
  source: number,
  dest: number,
  intersection: number
) {
  let i = intersection;
  let k = intersection;

  while (true) {
    if (halt) return;
    let div = document.getElementById(`${i}`);
    if (div === null || div === undefined) return;
    div.classList.add("path-animate");

    if (i === source) break;
    i = parentSource[i];
    await wait(5);
  }

  while (true) {
    if (halt) return;
    let div = document.getElementById(`${k}`);
    if (div === null || div === undefined) return;
    div.style.animation = "animatePath 0.1s forwards";
    if (k === dest) break;
    k = parentDest[k];
    await wait(5);
  }
}

const BidirectionalSearch = () => {
  let walls = useSelector<boolean[], boolean[]>(walls => walls);
  let parentSource: number[] = [];
  let parentDest: number[] = [];
  let intersection: { value: number } = { value: 0 };

  const {
    sourceId,
    destId,
    isReachable,
    ranAlready,
    isDestSelected,
    isSourceSelected
  } = useGridRefs();
  const isMounted = useMount();
  const [gridWidth, gridHeight] = useGridDimensions();

  let [isRunning, setRunning] = useState(false);
  let scroller = useRef<HTMLDivElement | null>(null);
  let [grid, setGrid] = useState<boolean[]>(() => {
    return [...walls]
  });

  useEffect(() => {
    setTimeout(() => {
      clearGrid(0, 0, [...walls])
    });
    return () => {
      halt = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setGrid([...walls]);
  }, [walls])

  useEffect(() => {
    if (scroller.current !== null)
      scroller.current.scrollIntoView({ behavior: 'smooth' });
  })

  const animate = async () => {
    if (ranAlready.current) {
      alert("Reset Grid before animating again")
      return;
    }
    if (!isSourceSelected.current || !isDestSelected.current) {
      alert("Select Source and Denstination before animating")
      return;
    }
    let gridSource = [...walls];
    let gridDest = [...walls];
    halt = false;
    setRunning(true);
    ranAlready.current = true;
    isReachable.current = await bidirectional(
      gridSource,
      gridDest,
      parentSource,
      parentDest,
      gridWidth,
      gridHeight,
      sourceId.current,
      destId.current,
      intersection
    );
    if (isReachable.current)
      await drawPath(
        parentSource,
        parentDest,
        sourceId.current,
        destId.current,
        intersection.value
      );
    else if (!halt) {
      let dest = document.getElementById(`${destId.current}`) as HTMLDivElement;
      dest.innerHTML = "";
      dest.classList.remove("visit-animate")
      dest.style.background = "red";
    }
    if (isMounted())
      setRunning(false);
  }

  return (
    <>
      <TopBar
        speed={speed}
        disabled={isRunning}
        clearWalls={() => clearWalls(walls)}
        clearGrid={() => {
          ranAlready.current = false;
          isReachable.current = false;
          isDestSelected.current = false;
          isSourceSelected.current = false;
          clearGrid(sourceId.current, destId.current, walls);
          setGrid([...walls]);
        }}
        start={animate}
        changeSpeed={(e) => {
          speed = 150 - parseInt((e.target as HTMLInputElement).value);
        }}
      />
      <div onClick={async (e) => {
        let target = e.target as HTMLDivElement;
        if (!isSourceSelected.current) {
          sourceId.current = parseInt(target.id);
          if (isNaN(sourceId.current) === false) {
            if (grid[sourceId.current] === true) {
              alert("Source cannot be a wall");
              return;
            }
            isSourceSelected.current = true;
            let src = document.getElementById(`source${sourceId.current}`) as HTMLDivElement;
            src.style.visibility = "visible";
          }
        } else if (isSourceSelected.current && !isDestSelected.current) {
          destId.current = parseInt(target.id);
          if (isNaN(destId.current) === false) {
            if (grid[destId.current] === true) {
              alert("Destination cannot be a wall");
              return;
            }
            if (sourceId.current === destId.current) {
              alert("Source and Destination should be distinct");
              return;
            }
            let dest = document.getElementById(`dest${destId.current}`) as HTMLDivElement;
            dest.style.visibility = "visible";
            isDestSelected.current = true;
          }
        } else if (ranAlready.current) {
          alert("Reset Grid before animating again")
        }
        else if (isSourceSelected.current && isDestSelected.current) {
          alert("Click Animate Path to start animation or reset the grid")
        }
      }}
      >
        <Grid grid={grid} gridWidth={gridWidth} disabled={isRunning} />
        <div ref={scroller} style={{ height: '2px' }}></div>
      </div>
    </>
  );
}

export default BidirectionalSearch;