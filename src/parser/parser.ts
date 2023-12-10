import { ColumnRule, parse } from "./generated/grammar";

// パーサーを使って制約式を解析する例
try {
	const parsed = parse(
		'((is("A") or is("C"))) or (is("C") or is("D"))',
	) as ColumnRule;
	console.log(parsed);
	console.log(JSON.stringify(parsed, null, 2));
} catch (error) {
	console.error(error);
}
