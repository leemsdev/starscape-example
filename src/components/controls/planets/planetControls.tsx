import { useSimConfig } from "../../../context/config.ctx";
import Panel from "../../foundations/panel/panel";
import Slider from "../../foundations/slider";

function usePlanetsConfig() {
	const { update, config: { planets: { clusterCount } } } = useSimConfig()

	function updateClusterCount(n: number) {
		update({ planets: { clusterCount: n } })
	}

	return {
		clusterCount,
		updateClusterCount
	}
}

export default function PlanetsControls() {
	const { clusterCount, updateClusterCount } = usePlanetsConfig()

	return (
		<Panel label="Planets">
			<Slider label="Clusters" value={clusterCount} update={updateClusterCount} min={0} max={100} step={1} />
		</Panel>
	)
}
