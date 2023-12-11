export class PayloadBuildError extends Error {
	constructor() {
		super();

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, PayloadBuildError.prototype);
	}
}

export class TransactionFailedError extends Error {
	constructor() {
		super();

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, PayloadBuildError.prototype);
	}
}
