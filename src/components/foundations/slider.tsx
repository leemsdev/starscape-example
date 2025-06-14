type SliderProps = {
	label: string,
	value: number,
	update: (nv: number) => void,
	min: number,
	max: number,
	step: number
}

export default function Slider({ label, value, update, min, max, step }: SliderProps) {
	return (
		<label style={{ display: 'flex', gap: '16px', flexDirection: 'row', alignItems: 'center' }}>
			<span>{label}</span>
			<input style={{ width: 300 }} min={min} max={max} value={value} step={step} onChange={e => update(Number.parseFloat(e.target.value))} type="range" className="slider" />
			<span>{value}</span>
		</label>
	)
}


