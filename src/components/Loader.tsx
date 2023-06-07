import Spinner from "react-bootstrap/Spinner";

import "./Loader.css";

function Loader() {
	return (
		<div className="outer-loader-backdrop">
			<Spinner animation="border" variant="warning" className="outer-loader" />
		</div>
	);
}

export default Loader;