import { ecs } from '../..';

import * as render from './render'
import * as effects from './effects'

export function run() {
	const layers = ecs.get().renderLayers

	for (const l of layers) {
		l.forEach((e) => {
			const isActive = ecs.get().active.get(e)

			if (!isActive) return;

			// Render visual effects right before rendering the actual entity
			// this ensures the entity is rendered on top of the effect.
			// NOTE: This is brittle. If we want to add effects later that render over the entity, this won't work, but it's fine for now cos our effects only need to render behind the entity.

			effects.run(e)
			render.run(e)
		})
	}

	//stats.setRenderCalls(renderCalls)
}
