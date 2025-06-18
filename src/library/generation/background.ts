import { math } from "../math/random";

const num_maps = 30;

const loadNoiseMaps = (): HTMLImageElement[] => {
    let imgs = []

    for (let i = 0; i < num_maps; i++) {
        let img = new Image();

        img.src = `/img/noisemaps/nebulas/map_${i}.png`;

        imgs.push(img);
    }

    return imgs;
}

const noisemaps = loadNoiseMaps()

function randomImage(): HTMLImageElement {
    const i = math.rnd(0, num_maps)

    return noisemaps[i]
}

export function randomNebula(): HTMLImageElement {
    return randomImage();
}
