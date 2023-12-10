export class ValidationError extends Error {
  name = "ValidationError";

  constructor(readonly message: string) {
    super(message);
  }
}
