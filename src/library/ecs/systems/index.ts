import * as spawners from './spawn'
import * as cleanup from './cleanup'

import * as camera from "./camera"
import * as translate from './translate'

import * as renderLayers from './render/renderlayer'
import * as twinkle from './twinkle'
import { ecs } from '..'

function run() {
	const activeEntities = ecs.get().active;

	camera.run()

	activeEntities.forEach((_, e) => {
		translate.run(e)
		twinkle.run(e)
		cleanup.run(e)

	})


	// Render each layer
	renderLayers.run()

	// These are not entity related, so dont run inside the loop
	spawners.run()
}

export const systems = {
	run
}
