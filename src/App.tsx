import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import { Container } from "react-bootstrap";

import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import OopsError from "./components/OopsError";

function App() {
	return (
		<ErrorBoundary fallback={<OopsError />}>
			<div className="app_main-container">
				<Header />
				<Container className="my-2">
					<Outlet />
				</Container>
			</div>
		</ErrorBoundary>
	);
}

export default App;
