import { FC } from "react";
import "./Cell.css"
import { gridCellSideLength } from "../algorithms/helper";

interface Props {
	index: number,
	visited: boolean
}

const Cell: FC<Props> = ({ index, visited }) => {
	return (
		<div
			id={`${index}`}
			className="cell"
			style={visited ? {
				backgroundColor: 'black',
				width: `${gridCellSideLength}px`,
				height: `${gridCellSideLength}px`,
				lineHeight: `${gridCellSideLength}px`,
			} : {
				backgroundColor: "rgb(0, 255, 170)",
				width: `${gridCellSideLength}px`,
				height: `${gridCellSideLength}px`,
				lineHeight: `${gridCellSideLength}px`,
			}}
			draggable
		>
			<img className="source" id={`source${index}`} src={process.env.PUBLIC_URL + '/source.svg'} alt="S" />
			<img className="dest" id={`dest${index}`} src={process.env.PUBLIC_URL + '/dest.svg'} alt="D" />
		</div>
	);
}

export default Cell;