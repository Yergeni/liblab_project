import { FormEvent, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Loader from "../components/Loader";

import { Character } from "../common/types";

import { CHARACTER_PATH } from "../common/constants";

import { axiosInstance } from "../utils/http.utils";
import CharacterList from "../components/character/CharacterList";

export default function CharactersPage() {
	const searchRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState(false);
	const [characters, setCharacters] = useState<Character[]>([]);

	const handleSearch = async (e: FormEvent) => {
		e.preventDefault();

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
				<Form className="d-flex" onSubmit={handleSearch}>
					<Form.Control
						ref={searchRef}
						type="search"
						placeholder="Search character by name"
						className="me-2 p-2"
						aria-label="Search"
					/>
					<Button type="submit" variant="outline-success" disabled={loading}>
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
