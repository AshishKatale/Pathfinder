import { useEffect, useRef } from "react"

const useMount = () => {
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true
		return () => { isMounted.current = false; }
	}, []);
	return () => isMounted.current;
}

export default useMount;