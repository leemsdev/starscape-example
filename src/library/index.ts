import { App } from "./app";
import { BGLayer, SimConfig } from "./config";
import { ecs } from "./ecs";
import { systems } from "./ecs/systems";
import { makeAsteroids } from "./generation/entities/asteroids";
import { makePlanetsWithin } from "./generation/entities/planets";
import { makeNClustersWithin } from "./generation/entities/stars";
import { noise } from "./generation/noise";
import { stats } from "./stats";

function makebglayers(layers: BGLayer[]): HTMLImageElement[] {
	const r = App.getCanvasRect()

	return layers.map(layer => {
		return noise.makeImg(r.width, r.height, layer.color, layer.sf)
	})
}

function drawBgLayers(layers: HTMLImageElement[]) {
	const { ctx } = App.get()

	for (const l of layers) {
		ctx.beginPath()
		ctx.drawImage(l, 0, 0)
		ctx.closePath()
	}

}

function reset() {
	ecs.clear();
	stats.clear();
}

let timer: NodeJS.Timeout | null = null
let bg: HTMLImageElement[] = []

export function runSim(config: SimConfig) {
	if (timer) clearInterval(timer)

	App.setup(config.canvasId)

	reset()

	bg = makebglayers(config.background.layers)

	makeNClustersWithin(App.getCanvasRect(), config.stars.clusterCount)
	makePlanetsWithin(App.getCanvasRect(), config.planets.clusterCount)
	makeAsteroids(App.getCanvasRect(), config.asteroids.count)

	timer = setInterval(() => {
		App.syncCanvas()
		App.syncDeltaTime()

		drawBgLayers(bg)
		systems.run()
	}, 16)
}
