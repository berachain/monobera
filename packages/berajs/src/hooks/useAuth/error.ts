export class UserRejectedError extends Error {
  constructor() {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UserRejectedError.prototype);
  }
}
