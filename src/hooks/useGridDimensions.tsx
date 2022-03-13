import { gridCellSideLength } from "../algorithms/helper"

const useGridDimensions = () => {
	const adjustedLength = gridCellSideLength + 2;
	const gridWidth = Math.floor(window.innerWidth / adjustedLength);
	const gridHeight = Math.floor((window.innerHeight * 0.7) / adjustedLength);
	return [gridWidth, gridHeight];
}

export default useGridDimensions;