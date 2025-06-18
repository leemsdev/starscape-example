import { Sprite } from "../ecs/components/sprite";
import { shapes } from "../generation/shapes";
import { math } from "../math/random";

const num_maps = 40;

const loadNoiseMaps = (): HTMLImageElement[] => {
    let imgs = []

    for (let i = 0; i < num_maps; i++) {
        let img = new Image()

        img.src = `/img/noisemaps/planets/noise_${i}.png`

        imgs.push(img)
    }

    return imgs
}

const noisemaps = loadNoiseMaps()

function randomImage(): HTMLImageElement {
    const i = math.rnd(0, num_maps)

    return noisemaps[i]
}

export function randomSprite(): Sprite {
    const circle = shapes.circle(0)
    return {
        img: {
            mask: true,
            ref: randomImage()
        },
        drawMode: 'fill',
        ...circle,
    }
}
