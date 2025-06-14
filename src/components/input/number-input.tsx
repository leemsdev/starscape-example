import { ChangeEventHandler } from "react"

import "./number-input.css"

type Props = {
	label: string,
	value: number,
	onChange: (n: number) => void,
	withControls?: boolean,
	step: number,
	min: number,
	max: number
}

export default function NumberInput({ min, max, step, label, value, onChange, withControls = true }: Props) {
	const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
		onChange(Number.parseFloat(e.target.value))
	}

	return (
		<label>
			<span className="column label-text">{label}</span>
			<input min={min} max={max} step={step} className="column" type="number" value={value} onChange={handleInput} />
			{withControls &&
				<div className="column controls">
					<button onClick={() => onChange(value - 1)}>-</button>
					<button onClick={() => onChange(value + 1)}>+</button>
				</div>}
		</label>
	)
}
