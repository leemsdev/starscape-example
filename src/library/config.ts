import { Color } from "./visual/color"

export type BGLayer = {
	alpha: number,
	sf: number,
	color: Color
}

export type SimConfig = {
	canvasId: string,
	stars: {
		clusterCount: number
	},
	planets: {
		clusterCount: number
	},
	background: {
		layers: BGLayer[]
	},
	asteroids: {
		count: number,
	}
}
