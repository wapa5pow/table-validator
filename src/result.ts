export class Result<T, E> {
  private _value?: T;
  private _error?: E;

  private constructor(value?: T, error?: E) {
    this._value = value;
    this._error = error;
  }

  static success<T, E>(value: T): Result<T, E> {
    return new Result<T, E>(value);
  }

  static failure<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(undefined, error);
  }

  get isSuccess(): boolean {
    return this._error === undefined;
  }

  get isError(): boolean {
    return this._error !== undefined;
  }

  get value(): T | undefined {
    return this._value;
  }

  get error(): E | undefined {
    return this._error;
  }
}
