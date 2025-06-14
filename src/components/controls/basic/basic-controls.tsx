import { useSimConfig } from "../../../context/config.ctx";
import Panel from "../../foundations/panel/panel";
import NumberInput from "../../input/number-input";

export default function BasicControls() {
	const { config, update } = useSimConfig()

	function setStarClusterCount(n: number) {
		update({ stars: { ...config.stars, clusterCount: n } })
	}

	function setPlanetClusterCount(n: number) {
		update({ planets: { ...config.planets, clusterCount: n } })
	}

	function setAsteroidCount(n: number) {
		update({ asteroids: { ...config.asteroids, count: n } })
	}

	return (
		<Panel startExpanded label="Basic controls">
			<NumberInput label="Star clusters" min={0} max={500} step={10} value={config.stars.clusterCount} onChange={setStarClusterCount} />
			<NumberInput label="Planet clusters" min={0} max={500} step={10} value={config.planets.clusterCount} onChange={setPlanetClusterCount} />
			<NumberInput label="Asteroids" min={0} max={500} step={10} value={config.asteroids.count} onChange={setAsteroidCount} />
		</Panel>
	)
}
