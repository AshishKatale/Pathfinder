export const gridCellSideLength = (window.innerWidth < 1000 ? 30 : Math.floor(window.innerWidth / 44)) - 2;

export const neighbours = 4;

export const directions = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];

export function wait(speed: number) {
  return new Promise((res, rej) => {
    setTimeout(res, speed);
  });
}

export async function isValidCell(i: number, j: number, w: number, h: number) {
  return new Promise((res, rej) => {
    if (i >= 0 && i < h && j >= 0 && j < w) res(true);
    res(false);
  });
}

export function clearGrid(sourceId: number, destId: number, walls: boolean[]) {
  walls.forEach((isWall, i) => {
    if (!isWall) {
      let div = document.getElementById(`${i}`);
      if (div === null || div === undefined) return;
      div.style.animation = "";
      div.style.backgroundColor = "rgb(0, 255, 170)";
      div.classList.remove("visit-animate");
      div.classList.remove("path-animate");
    }
  })
  let dest = document.getElementById(`dest${destId}`) as HTMLDivElement;
  if (dest !== null && dest !== undefined)
    dest.style.visibility = "hidden";
  let src = document.getElementById(`source${sourceId}`) as HTMLDivElement;
  if (src !== null && src !== undefined)
    src.style.visibility = "hidden";
}

export function clearWalls(walls: boolean[]) {
  walls.forEach((isWall, i) => {
    if (isWall) {
      let div = document.getElementById(`${i}`);
      if (div === null || div === undefined) return;
      div.classList.remove("wall-animate");
    }
  })
}