export class KeplrUninstalledError extends Error {
  constructor() {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, KeplrUninstalledError.prototype);
  }
}

export class KeplrUpgradeError extends Error {
  constructor() {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, KeplrUninstalledError.prototype);
  }
}
