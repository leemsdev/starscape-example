import alea from 'alea';
import { color, Color } from "../visual/color";
import { math } from "../math/random";
import { createNoise2D } from 'simplex-noise';

const getNF = () => {
	let prng = alea()
	return createNoise2D(prng)
}

function makeImg(w: number, h: number, col: Color, sf: number = 0.001, step: number = 6): HTMLImageElement {
	const fnoise = getNF()

	const tempCanvas = document.createElement("canvas") as HTMLCanvasElement

	tempCanvas.width = w
	tempCanvas.height = h

	const ctx = tempCanvas.getContext("2d")

	if (!ctx) throw new Error("Couldn't create temp canvas to gen noise")

	ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

	const ba = math.rndf(0.2, 0.3)

	for (let x = 0; x < w; x += step) {
		for (let y = 0; y < h; y += step) {
			const n = fnoise(x * sf, y * sf)

			const ca = color.multiply(col, ba)
			ca.a *= Math.pow(n, 2)

			ctx.fillStyle = color.rgba(ca)

			ctx.fillRect(x, y, step, step)
		}
	}

	const img = new Image();
	img.src = tempCanvas.toDataURL();

	return img

}

export const noise = {
	makeImg
}

