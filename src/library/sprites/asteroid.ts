import { Sprite } from "../ecs/components/sprite"
import { shapes } from "../generation/shapes"
import { math } from "../math/random"

const num_maps = 3;

const loadNoiseMaps = (): HTMLImageElement[] => {
    let imgs = []

    for (let i = 0; i < num_maps; i++) {
        let img = new Image();

        img.src = `/img/noisemaps/asteroids/noise_${i}.png`;

        imgs.push(img);
    }

    return imgs;
}

const noisemaps = loadNoiseMaps()

function randomImage(): HTMLImageElement {
    const i = math.rnd(0, num_maps)

    return noisemaps[i]
}

export function randomAsteroid(): Sprite {
    const roughness = math.rnd(1, 3)
    const asteroid = shapes.circle(roughness)

    return {
        drawMode: 'fill',
        img: {
            ref: randomImage(),
            mask: true,
        },
        ...asteroid,
    }
}
