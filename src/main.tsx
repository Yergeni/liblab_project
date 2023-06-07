import React from "react";
import ReactDOM from "react-dom/client";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import { ROUTES } from "./common/constants";

import App from "./App";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import CharactersPage from "./pages/CharactersPage";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={ROUTES.HOME} element={<App />}>
			<Route index={true} path={ROUTES.HOME} element={<HomePage />} />
			<Route path={ROUTES.MOVIE} element={<MoviePage />} />
			<Route path={ROUTES.CHARACTERS} element={<CharactersPage />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
