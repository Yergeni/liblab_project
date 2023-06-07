export const API_KEY = import.meta.env.VITE_API_KEY

export const MOVIE_PATH = '/movie';
export const QUOTE_PATH = '/quote';
export const CHARACTER_PATH = '/character';

export const ROUTES = {
  HOME: '/',
  MOVIE: `${MOVIE_PATH}/:id`,
  CHARACTERS: '/characters',
  CHARACTER: `${CHARACTER_PATH}/:id`,
}