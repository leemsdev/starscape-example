import { useSimConfig } from "../../../context/config.ctx";
import Panel from "../../foundations/panel/panel";
import Slider from "../../foundations/slider";

function useStarsConfig() {
	const { config: { stars }, update } = useSimConfig()

	function updateClusterCount(n: number) {
		update({ stars: { ...stars, clusterCount: n } })
	}

	return {
		...stars,
		updateClusterCount
	}
}

export default function StarsControls() {
	const { clusterCount, updateClusterCount } = useStarsConfig()

	return (
		<Panel label="Stars">
			<Slider label="Cluster count" value={clusterCount} step={1} min={0} max={500} update={updateClusterCount} />
		</Panel>
	)
}
