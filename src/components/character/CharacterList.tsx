import { CharacterProps } from "./charater.types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export default function CharacterList({ characters }: CharacterProps) {
	// TODO: improve by letting the user load more characters
	// OR improve by getting a random number of characters
	// NOTE: the `sample` method from lodash can be useful
	const someCharacters = characters ? characters.slice(0, 20) : [];

	return someCharacters.length > 0 ? (
		<Row className="g-4 mt-3">
			<h1 className="text-white">Characters</h1>
			{someCharacters.map((character) => (
				<Col key={character._id} xs={6} sm={6} md={6} lg={3}>
					<Card>
						<Card.Body>
							<Card.Title>{character.name}</Card.Title>
							<ListGroup className="list-group-flush">
								<ListGroup.Item>Race: {character.race}</ListGroup.Item>
								<ListGroup.Item>Gender: {character.gender}</ListGroup.Item>
							</ListGroup>
							<Button
								variant="link"
								onClick={() => window.open(character.wikiUrl)}
							>
								More info
							</Button>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	) : null;
}
