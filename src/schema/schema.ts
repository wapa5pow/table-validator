import { RuleParseError } from "./errors";
import {
  ColumnRule,
  PeggySyntaxError,
  parse,
} from "./parser/generated/grammar";

export class Schema {
  readonly columnRules: (ColumnRule | undefined)[];

  constructor(readonly rawRules: string[]) {
    this.columnRules = [];
    for (let i = 0; i < rawRules.length; i++) {
      const rawRule = rawRules[i];
      try {
        if (rawRule != null) {
          this.columnRules.push(parse(rawRule.trim()));
        } else {
          this.columnRules.push(undefined);
        }
      } catch (error) {
        if (error instanceof PeggySyntaxError) {
          throw new RuleParseError(rawRule, i, error.location.start.offset);
        }
        throw error;
      }
    }
  }
}
