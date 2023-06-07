import { LinkContainer } from "react-router-bootstrap";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { ROUTES } from "../common/constants";

export default function Header() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
			<Container>
				<LinkContainer to={ROUTES.HOME}>
					<Navbar.Brand>LOTR Info</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<LinkContainer to={ROUTES.CHARACTERS}>
							<Nav.Link>Character Lookup</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
