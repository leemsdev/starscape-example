import { useEffect } from "react";
import BackgroundControls from "../../components/controls/background/background";
import BasicControls from "../../components/controls/basic/basic-controls";
import { useSimConfig } from "../../context/config.ctx";

import "./configuration.css"

export default function Configuration() {
	const { applyConfig } = useSimConfig()

	useEffect(() => {
		document.addEventListener("keypress", e => {
			if (e.key === ' ') applyConfig()
		})
	}, [applyConfig])

	return (
		<section className="config">
			<div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '24px', padding: 16 }}>
				<h1 style={{ margin: 0, marginBottom: 12, color: 'rgba(200, 200, 200, 1.0)' }}>Starscape</h1>
				<span>Press space key to regenerate</span>
				<br />
				<BasicControls />
				<BackgroundControls />
			</div>
		</section>
	)
}
