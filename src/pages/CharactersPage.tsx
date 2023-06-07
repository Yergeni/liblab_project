import { useMemo, useRef, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Loader from "../components/Loader";

import { Character, Pagination } from "../common/types";

import { CHARACTER_PATH } from "../common/constants";

import { axiosInstance } from "../utils/http.utils";
import CharacterList from "../components/character/CharacterList";

/* TODO */
export default function CharactersPage() {
	const searchRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState(false);
	const [characters, setCharacters] = useState<Character[]>([]);

	const handleSearch = async () => {
		if (searchRef?.current?.value) {
			setLoading(true);
			axiosInstance
				.get(CHARACTER_PATH, {
					params: { name: new RegExp(searchRef.current.value, "i") },
				})
				.then((response) => {
					setCharacters(response.data.docs);
				})
				.catch((error) => {
					console.error(error);
					setFetchError(true);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	return (
		<>
			{loading && <Loader />}
			<Stack>
				<Form className="d-flex">
					<Form.Control
						ref={searchRef}
						type="search"
						placeholder="Search character by name"
						className="me-2 p-2"
						aria-label="Search"
					/>
					<Button
						variant="outline-success"
						disabled={loading}
						onClick={handleSearch}
					>
						Search
					</Button>
				</Form>
			</Stack>
			{fetchError ? (
				<Alert variant="danger" className="mt-3">
					Error retreiving the characters. Please, try again.
				</Alert>
			) : (
				<CharacterList characters={characters} />
			)}
		</>
	);
}
