import { IsRule, NotEmptyRule } from "../schema/rule";
import { Row } from "../table/table";
import { ColumnRule, parse } from "./generated/grammar";

function validate(
  columnRule: ColumnRule,
  columnIndex: number,
  row: Row,
): Error[] {
  switch (columnRule.type) {
    case "or": {
      const leftErrors = validate(columnRule.left, columnIndex, row);
      if (leftErrors.length === 0) {
        return [];
      }
      return validate(columnRule.right, columnIndex, row);
    }
    case "and": {
      return [
        ...validate(columnRule.left, columnIndex, row),
        ...validate(columnRule.right, columnIndex, row),
      ];
    }
    case "is": {
      const isRule = new IsRule(columnRule.value);
      const result = isRule.evaluate(columnIndex, row);
      const error = result.error;
      if (error == null) {
        return [];
      }
      return [error];
    }
    case "notEmpty": {
      const notEmptyRule = new NotEmptyRule();
      const result = notEmptyRule.evaluate(columnIndex, row);
      const error = result.error;
      if (error == null) {
        return [];
      }
      return [error];
    }
    case "array":
      return columnRule.values.flatMap((rule) =>
        validate(rule, columnIndex, row),
      );
    default:
      // caseに漏れがあった場合、エラーにする。
      // https://zenn.dev/qnighy/articles/462baa685c80e2
      throw new Error(
        `Unknown type: ${(columnRule as { type: "__invalid__" }).type}`,
      );
  }
}

// パーサーを使って制約式を解析する例
try {
  const columnRule = parse(
    'is("A") or is("B") or is("C") or is("D")',
  ) as ColumnRule;

  console.log(JSON.stringify(columnRule, null, 2));
  console.log(validate(columnRule, 0, new Row(1, ["a"])));
} catch (error) {
  console.error(error);
}
