# Table Validator

[**Online Demo**](https://wapa5pow.github.io/table-validator/)

[table-validator](https://www.npmjs.com/package/table-validator) is an table(like csv) validator library in Typescript.
With yaml schema definition, it validates an table and throw error if content does not match the schema.
It implements features inspired by "[csv-validator](https://github.com/digital-preservation/csv-validator)".

## Installation

```bash
npm install table-validator
```

## API

```typescript
const schema = convertToSchema(fs.readFileSync("/path/to/yaml", "utf8"));
const table = convertToTable(fs.readFileSync("/path/to/csv", "utf8"), {
  header: true,
});
const validator = new Validator();
const errors = validator.validate(table, schema);
if (errors.length === 0) {
  console.log("No error");
} else {
  for (const error of errors) {
    console.log(`${error}`);
  }
}
```

## List of available rules

Non combinatorial expressions

- notEmpty: `notEmpty`
- empty: `empty`
- is: `is("Japan")`
- not: `not("Tokyo")`
- unique: `unique`
- range: `range(10,20)`
- length: `length(2,10)`
- regex: `regex("[bcm]at")`
- integer: `integer`
- float: `float`

Combinatorial expression

- or: `is("Japan") or is("France")`
- and: `length(2) and range(10,20)`

Others

- parentheses: `(length(2) and range(10,20)) or empty`

## Example

### React example

```bash
npm run react
```

### CLI example

```bash
npm run cli
```
