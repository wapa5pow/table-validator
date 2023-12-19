import fs from "fs";
import { Validator, convertToSchema, convertToTable } from "table-validator";

function validateArgs(args: string[]) {
  const usage = "Usage: table-validator schema.yaml data.csv";
  if (args.length !== 4) {
    throw Error(usage);
  }
  if (!args[2].endsWith(".yaml")) {
    throw Error(usage);
  }
  if (!args[3].endsWith(".csv")) {
    throw Error(usage);
  }
}
async function main() {
  validateArgs(process.argv);

  const schema = convertToSchema(fs.readFileSync(process.argv[2], "utf8"));
  const table = convertToTable(fs.readFileSync(process.argv[3], "utf8"), {
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
    process.exit(1);
  }
}
main();
