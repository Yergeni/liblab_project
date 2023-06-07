import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Loader from "../components/Loader";

import { MOVIE_PATH, ROUTES } from "../common/constants";

/* Types */
import { Movie } from "../common/types";

/* Utils */
import { axiosInstance } from "../utils/http.utils";
import { getImageFromMovie } from "../utils/movie.utils";

import "./HomePage.css";

const lordOfTheRingTitles = [
	"The Fellowship of the Ring",
	"The Two Towers",
	"The Return of the King",
];

export default function HomePage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState(false);
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		setLoading(true);
		axiosInstance
			.get(MOVIE_PATH)
			.then((response) => {
				setMovies(
					(response.data.docs as Movie[]).filter((movie) => {
						if (lordOfTheRingTitles.includes(movie.name)) {
							return movie;
						}
					})
				);
			})
			.catch((error) => {
				console.error(error);
				setFetchError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (fetchError) {
		return (
			<Alert variant="danger">
				Error retreiving the movie. Please, refresh the page to try again.
			</Alert>
		);
	}

	if (loading) {
		return <Loader />;
	}

	return (
		<Container>
			<h1 className="home-page_title">The Lord Of The Rings Trilogy</h1>
			<Row>
				{movies.map((movie) => {
					return (
						<Col key={movie._id} xs={12} sm={6} md={4} className="mb-3">
							<Image
								src={getImageFromMovie(movie.name)}
								rounded
								fluid
								className="home-page_image"
								onClick={() => navigate(`${MOVIE_PATH}/${movies[0]._id}`)}
							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
