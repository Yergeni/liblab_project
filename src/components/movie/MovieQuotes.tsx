import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { MovieProps } from "./movie.types";
import { Pagination, Quote } from "../../common/types";

import { MOVIE_PATH } from "../../common/constants";

import Loader from "../Loader";
import { Stack } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { axiosInstance } from "../../utils/http.utils";

import "./MovieQuotes.css";

const limit = 20;

/* TODO: improve by using an infinite scrolling */
export default function MovieQuotes({ characters }: MovieProps) {
	const { id } = useParams();

	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState(false);
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [pagination, setPagination] = useState<Pagination>();

	const allQuotesLoaded = pagination && pagination.page === pagination.pages;
	const loadQuotesBtnText = () => {
		if (quotes.length > 0 && !allQuotesLoaded) {
			return "Load More Quotes";
		} else if (quotes.length > 0 && allQuotesLoaded) {
			return "All Quotes Loaded";
		}

		return "Load Movie Quotes";
	};

	const getCharacterName = useMemo(
		() => (characterId: string) => {
			const foundCharacter = characters?.find((c) => c._id === characterId);
			return foundCharacter ? foundCharacter.name : "A Character"; 
		},
		[characters]
	);

	const handleLoadMore = async () => {
		setLoading(true);
		axiosInstance
			.get(`${MOVIE_PATH}/${id}/quote`, {
				params: { limit, page: (pagination?.page || 0) + 1 },
			})
			.then((response) => {
				setQuotes((prevQuotes) => prevQuotes.concat(response.data.docs));
				setPagination({
					total: response.data.total,
					limit: response.data.limit,
					offset: response.data.offset,
					page: response.data.page,
					pages: response.data.pages,
				});
			})
			.catch((error) => {
				console.error(error);
				setFetchError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (fetchError) {
		return (
			<Alert variant="danger">
				Error retreiving the quotes. Please, refresh the page to try again.
			</Alert>
		);
	}

	return (
		<div className="movie-quotes_container">
			{loading && <Loader />}
			<ListGroup>
				{quotes.map((quote, index) => {
					return (
						<ListGroup.Item key={quote._id + index}>
							<div className="ms-2 me-auto">
								<div className="fw-bold">
									{getCharacterName(quote.character)}
								</div>
								{quote.dialog}
							</div>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
			<Stack>
				<Button
					variant="primary"
					size="lg"
					onClick={handleLoadMore}
					disabled={allQuotesLoaded}
					className={quotes.length > 0 ? "mt-3" : ""}
				>
					{loadQuotesBtnText()}
				</Button>
			</Stack>
		</div>
	);
}
