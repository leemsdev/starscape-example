import { useSimConfig } from "../../../context/config.ctx"
import { BGLayer } from "../../../library/config"
import ColorPicker from "../../foundations/color/color-picker"
import Panel from "../../foundations/panel/panel"
import NumberInput from "../../input/number-input"

function useBackgroundConfig() {
	const { update, config: { background } } = useSimConfig()


	const updateLayer = (i: number, updates: Partial<BGLayer>) => {
		let updatedLayers = [...background.layers]
		let layerToUpdate = updatedLayers[i]

		updatedLayers[i] = { ...layerToUpdate, ...updates }


		update({ background: { ...background, layers: updatedLayers } })
	}

	const addLayer = () => {
		update({ background: { ...background, layers: [...background.layers, { alpha: 0.1, sf: 0.01, color: { r: 255, g: 255, b: 255, a: 1.0 } }] } })
	}

	const removeLayer = (i: number) => {
		const updated = background.layers.filter((_, idx) => i !== idx)

		update({ background: { ...background, layers: updated } })
	}

	return {
		...background,
		updateLayer,
		addLayer,
		removeLayer
	}
}

function Layer({ layer, update, i, deleteLayer }: { layer: BGLayer, deleteLayer: (i: number) => void, update: (i: number, updates: Partial<BGLayer>) => void, i: number }) {
	return (
		<div style={{ display: 'flex', gap: 12, flexDirection: "column", padding: 12 }}>
			<NumberInput label="Alpha" min={0.01} max={0.99} step={0.001} value={layer.alpha} onChange={alpha => update(i, { alpha })} />
			<NumberInput label="Gloop" min={0.0001} max={0.009} step={0.0001} value={layer.sf} onChange={sf => update(i, { sf })} />
			<ColorPicker update={color => update(i, { color })} color={layer.color} />
			<button onClick={() => deleteLayer(i)}>Delete</button>
		</div>
	)
}

export default function BackgroundControls() {
	const { updateLayer, layers, addLayer, removeLayer } = useBackgroundConfig()

	return (
		<Panel label="Background">
			{layers.map((layer, i) => (
				<Layer layer={layer} i={i} update={updateLayer} deleteLayer={removeLayer} />

			))}
			<button onClick={addLayer}>Add layer</button>
		</Panel >
	)
}
