import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { runSim } from "../library";
import { SimConfig } from "../library/config";

const defaultConfig: SimConfig = {
	canvasId: "",
	stars: { clusterCount: 0 },
	planets: { clusterCount: 0 },
	asteroids: { count: 0 },
	background: {
		layers: []
	}
}


type ConfigContextType = {
	config: SimConfig,
	update: (updates: Partial<SimConfig>) => void,
	collect: () => SimConfig,
	applyConfig: () => void
}

export const ConfigContext = React.createContext<ConfigContextType>({
	config: defaultConfig,
	update: () => { },
	collect: () => defaultConfig,
	applyConfig: () => { }
})

export default function ConfigProvider({ children, canvasId }: { children: ReactNode, canvasId: string }) {
	const [config, setConfig] = useState<SimConfig>({ ...defaultConfig, canvasId })

	useEffect(() => {
		const localConf = window.localStorage.getItem("SimConfig")

		console.log(localConf)

		if (localConf) {
			setConfig(JSON.parse(localConf))
		}
	}, [])

	function applyConfig() {
		runSim(collect())
	}

	function update(updates: Partial<SimConfig>) {
		const updatedConfig = {
			...config,
			...updates,
		}

		setConfig(updatedConfig)

		window.localStorage.setItem("SimConfig", JSON.stringify(updatedConfig))
	}

	function collect() {
		const strconf = window.localStorage.getItem("SimConfig")

		return strconf ? JSON.parse(strconf) : config
	}

	return (
		<ConfigContext.Provider value={{ config, update, collect, applyConfig }}>
			{children}
		</ConfigContext.Provider>
	)
}

export const useSimConfig = () => useContext(ConfigContext)
