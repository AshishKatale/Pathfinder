import { useRef } from "react";

const useGridRefs = () => {

	const sourceId = useRef<number>(Infinity);
	const destId = useRef<number>(Infinity);
	const isReachable = useRef(false);
	const ranAlready = useRef(false);
	const isDestSelected = useRef(false);
	const isSourceSelected = useRef(false);

	return { sourceId, destId, isReachable, ranAlready, isDestSelected, isSourceSelected };
}

export default useGridRefs;