/** @format */
import Size from "md/size";
import { useState, useEffect } from "react";

export default function useSize() {
	let [size, setSize] = useState<Size>({ width: 0, height: 0 });

	useEffect(() => {
		function handleResize() {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		}

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	function handleResize() {
		setSize({ width: window.innerWidth, height: window.innerHeight });
	}

	return size;
}
