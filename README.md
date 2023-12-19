# CSV Validator

## API

```typescript
const schema = convertToSchema(fs.readFileSync("/path/to/yaml", "utf8"));
const table = convertToTable(fs.readFileSync("/path/to/csv", "utf8"), true);
const validator = new Validator();
const errors = validator.validate(table, schema);
if (errors.length === 0) {
  console.log("No error");
} else {
  for (const error of errors) {
    console.log(`${error}`);
  }
  process.exit(1);
}
```

## Example

### React example

```bash
npm run react
```

### CLI example

```bash
npm run cli
```
