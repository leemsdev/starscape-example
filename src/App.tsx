import './App.css';
import ConfigProvider from './context/config.ctx';
import Configuration from './scenes/configuration/configuration';

function App() {
	return (
		<main>
			<ConfigProvider canvasId='canvas'>
				<Configuration />
				<section className="sim-container">
					<canvas id="canvas" />
				</section>
			</ConfigProvider>
		</main>
	);
}

export default App;
