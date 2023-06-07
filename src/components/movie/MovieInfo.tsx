import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Movie } from "../../common/types";
import { MovieProps } from "./movie.types";

import { MOVIE_PATH } from "../../common/constants";

import Loader from "../Loader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Rating from "../Rating";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";

import { axiosInstance } from "../../utils/http.utils";
import { getImageFromMovie } from "../../utils/movie.utils";

import "./MovieInfo.css";
import CharacterList from "../character/CharacterList";

export default function MovieInfo({ characters }: MovieProps) {
	const { id } = useParams();

	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState(false);
	const [movie, setMovie] = useState<Movie | null>();

	useEffect(() => {
		if (id) {
			setLoading(true);
			axiosInstance
				.get(`${MOVIE_PATH}/${id}`)
				.then((response) => {
					setMovie(response.data.docs[0]);
				})
				.catch((error) => {
					console.error(error);
					setFetchError(true);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [id]);

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
			<Row>
				<Col xs={12} sm={12} md={6} lg={4}>
					<Image src={getImageFromMovie(movie?.name || "")} rounded fluid />
				</Col>
				<Col xs={12} sm={12} md={6} lg={8}>
					<h2 className="movie-info_title">{movie?.name}</h2>
					<Stack gap={3}>
						<Rating value={movie?.rottenTomatoesScore || 0} />
						<p className="movie-info_info">
							Duration: {movie?.runtimeInMinutes} minutes
						</p>
						<p className="movie-info_info">
							Budget: ${movie?.budgetInMillions} millions
						</p>
						<p className="movie-info_info">
							Revenue: ${movie?.boxOfficeRevenueInMillions} millions
						</p>
						<p className="movie-info_info">
							Nominations: {movie?.academyAwardNominations} times
						</p>
						<p className="movie-info_info">Awards: {movie?.academyAwardWins}</p>
					</Stack>
				</Col>
			</Row>

			{/* Movie Character List */}
			<CharacterList characters={characters || []} />
		</Container>
	);
}
