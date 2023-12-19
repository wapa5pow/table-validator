# CSV Validator

This is an csv validator library in Typescript.
With yaml schema definition, it validates csv and throw error if csv does not match the schema.
It implements features inspired by "[csv-validator](https://github.com/digital-preservation/csv-validator)".

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

- is
- not
- in
- regex
- range
- length
- empty
- notEmpty
- unique

Combinatorial expression

- or
- and

## Example

### React example

```bash
npm run react
```

### CLI example

```bash
npm run cli
```
