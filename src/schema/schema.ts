import { ParseGrammarError } from "./errors";
import {
  ColumnRule,
  PeggySyntaxError,
  parse,
} from "./parser/generated/grammar";

export class Schema {
  readonly columnRules: ColumnRule[];

  constructor(readonly rawRules: string[]) {
    this.columnRules = [];
    for (let i = 0; i < rawRules.length; i++) {
      try {
        this.columnRules.push(parse(rawRules[i]));
      } catch (error) {
        if (error instanceof PeggySyntaxError) {
          throw new ParseGrammarError(i, error.location.start.offset);
        }
        throw error;
      }
    }
  }
}
