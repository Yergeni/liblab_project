import { useEffect, useState } from "react";

import { Character } from "../common/types";

import { CHARACTER_PATH } from "../common/constants";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MovieInfo from "../components/movie/MovieInfo";
import MovieQuotes from "../components/movie/MovieQuotes";

import { axiosInstance } from "../utils/http.utils";

import "./MoviePage.css";

export default function MoviePage() {
	const [characters, setCharacters] = useState<Character[]>([]);

	useEffect(() => {
		axiosInstance
			.get(CHARACTER_PATH)
			.then((response) => {
				setCharacters(response.data.docs);
			})
			.catch((error) => {
				console.error(error);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="movie-page_container">
			<Tabs defaultActiveKey="info" id="movie-tab" className="mb-3" justify>
				<Tab eventKey="info" title="Information">
					<MovieInfo characters={characters} />
				</Tab>
				<Tab eventKey="quotes" title="Quotes">
					<MovieQuotes characters={characters} />
				</Tab>
			</Tabs>
		</div>
	);
}
