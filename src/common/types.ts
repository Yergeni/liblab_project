export type Movie = {
	_id: string;
	name: string;
	runtimeInMinutes: number;
	budgetInMillions: number;
	boxOfficeRevenueInMillions: number;
	academyAwardNominations: number;
	academyAwardWins: number;
	rottenTomatoesScore: number;
};

export type Quote = {
	_id: string;
	dialog: string;
	movie: string;
	character: string;
};

export type Character = {
	_id: string;
	height: string;
	race: string;
	gender: "Male" | "Female";
	birth: string;
	spouse: string;
	death: string;
	realm: string;
	hair: string;
	name: string;
	wikiUrl: string;
};

export type Pagination = {
	total: number;
	limit: number;
	offset: number;
	page: number;
	pages: number;
};

// export type QuoteWithPagination = {
// 	quotes: Quote[],
// 	pagination: Pagination
// }
