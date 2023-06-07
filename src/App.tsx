import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import { Container } from "react-bootstrap";

import "./App.css";

function App() {
	return (
		<div className="app_main-container">
			<Header />
			<Container className="my-2">
				<Outlet />
			</Container>
		</div>
	);
}

export default App;
