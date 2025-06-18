import { App } from "./app";
import { BGLayer, SimConfig } from "./config";
import { ecs } from "./ecs";
import { systems } from "./ecs/systems";
import { makeAsteroids } from "./generation/entities/asteroids";
import { makePlanetsWithin } from "./generation/entities/planets";
import { makeNClustersWithin } from "./generation/entities/stars";
import { noise } from "./generation/noise";
import { stats } from "./stats";
import { Color } from "./visual/color";

function makeNebulas(layers: BGLayer[]): Nebula[] {
    return layers.map(l => {
        let col = l.color;

        return {
            img: noise.makeImg(16, 16, l.color, l.sf, 1),
            color: col,
        }
    })
}

type Nebula = {
    color: Color,
    img: HTMLImageElement,
}

function drawNebulas(nebulas: Nebula[], width: number, height: number) {
    const { ctx } = App.get()


    for (const n of nebulas) {
        ctx.drawImage(n.img, 0, 0, width, height)
    }


}

function reset() {
    ecs.clear();
    stats.clear();
}

let timer: NodeJS.Timeout | null = null

export function runSim(config: SimConfig) {
    if (timer) clearInterval(timer)

    App.setup(config.canvasId)

    reset()

    const nebulas = makeNebulas(config.background.layers)

    makeNClustersWithin(App.getCanvasRect(), config.stars.clusterCount)
    makePlanetsWithin(App.getCanvasRect(), config.planets.clusterCount)
    makeAsteroids(App.getCanvasRect(), config.asteroids.count)

    timer = setInterval(() => {
        App.syncCanvas()
        App.syncDeltaTime()

        const rect = App.getCanvasRect()

        drawNebulas(nebulas, rect.width, rect.height)
        systems.run()
    }, 16)
}
