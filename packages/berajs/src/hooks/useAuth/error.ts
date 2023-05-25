export class UserRejectedError extends Error {
  constructor() {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UserRejectedError.prototype);
  }
}

export class KeplrNotInstalledError extends Error {
  constructor() {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UserRejectedError.prototype);
  }
}

export class KeplrOutdatedError extends Error {
  constructor() {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UserRejectedError.prototype);
  }
}
