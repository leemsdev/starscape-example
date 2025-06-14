import { useState } from "react"
import { Color } from "../../../library/visual/color";
import "./color-picker.styles.css"

type Props = {
	update: (col: Color) => void,
	color: Color
}

function hexToRgba(hex: string) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const a = 1;

	return { r, g, b, a }
}

function rgbaToHex(col: Color) {
	return (
		"#" +
		col.r.toString(16).padStart(2, "0") +
		col.g.toString(16).padStart(2, "0") +
		col.b.toString(16).padStart(2, "0")
	);
}

export default function ColorPicker({ update, color }: Props) {
	const [col, setCol] = useState(rgbaToHex(color))

	function onChange(color: string) {
		setCol(color)
		update(hexToRgba(color))
	}

	return (
		<label>
			<span className="column">Color</span>
			<input className="column" value={col} onChange={e => onChange(e.target.value)} type="text" />
			<div className="column">
				<input className="picker" value={col} onChange={e => onChange(e.target.value)} type="color" />
			</div>
		</label>
	)
}
