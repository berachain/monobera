export class RouteNotFound extends Error {
	constructor(message: string) {
		super(message);
		this.name = "no swap route found";
	}
}
