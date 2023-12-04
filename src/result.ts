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

	isSuccess(): boolean {
		return this._error === undefined;
	}

	isError(): boolean {
		return this._error !== undefined;
	}

	getValue(): T | undefined {
		if (this.isError()) {
			throw new Error("Cannot get the value of a failed result.");
		}
		return this._value;
	}

	get value(): T | undefined {
		return this._value;
	}

	get error(): E | undefined {
		return this._error;
	}
}
