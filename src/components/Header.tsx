import { LinkContainer } from "react-router-bootstrap";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Logo from "../assets/lotr-logo-ring.png";

import { ROUTES } from "../common/constants";

export default function Header() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
			<Container>
				<LinkContainer to={ROUTES.HOME}>
					<img src={Logo} width="auto" height="56" alt="LOTR logo" />
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
