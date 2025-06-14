import { useState } from "react";

export default function useStarsConfig() {
	const [clusterCount, setClusterCount] = useState<string>("0")

	function collect() {
		return {
			clusterCount: Number.parseInt(clusterCount)
		}
	}

	return {
		clusterCount: { value: clusterCount, update: setClusterCount },
		collect,
	}
}
