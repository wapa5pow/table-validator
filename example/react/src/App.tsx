import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import React from "react";
import {
  Schema,
  Table,
  ValidationError,
  Validator,
  convertToSchema,
  convertToTable,
} from "table-validator";
import "./App.css";

function format(value: string): string {
  return value.replace(/^\n/, "").replace(/\n$/, "");
}

const defaultYaml = format(`
columns:
  - id: id
    rule: notEmpty and unique
  - id: country
    rule: is("China") or is("Japan") or is("Russia")
  - id: capital
    rule:
  - id: population
    rule: integer and range(0,*)
`);
const defaultCsv = format(`
id,country,capital,population
1,China,Beijing,21542000
2,Japan,Tokyo,14094034.5
3,Russia,Moscow,13104177
`);

function App() {
  const [yamlValue, setYamlValue] = React.useState(defaultYaml);
  const [yamlError, setYamlError] = React.useState("");
  const [csvValue, setCsvValue] = React.useState(defaultCsv);
  const [csvError, setCsvError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [lastDate, setLastDate] = React.useState("");
  const [isValid, setIsValid] = React.useState<boolean | undefined>(undefined);

  const runValidation = async () => {
    setLastDate(new Date().toString());
    setYamlError("");
    setCsvError("");
    setMessage("");
    setIsValid(undefined);

    const messages: string[] = [];
    let schema: Schema;
    let table: Table;
    try {
      schema = convertToSchema(yamlValue);
    } catch (err) {
      setYamlError(`${err}`);
      return;
    }
    console.log(JSON.stringify(schema));
    try {
      table = convertToTable(csvValue, { header: true });
    } catch (err) {
      setCsvError(`${err}`);
      return;
    }
    console.log(JSON.stringify(table));

    try {
      const validator = new Validator();
      const errors: ValidationError[] = validator.validate(table, schema);
      console.log(errors);
      if (errors.length === 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
        messages.push(...errors.map((e) => `${e}`));
      }
    } catch (error) {
      messages.push(`${error}`);
    }
    setMessage(messages.join("\n"));
  };

  const errorTheme = EditorView.theme(
    {
      "&": {
        color: "red",
        backgroundColor: "white",
      },
      ".cm-line": {
        padding: "0",
      },
    },
    { dark: true },
  );

  return (
    <div style={{ margin: "1em" }}>
      <h1 style={{ padding: 0, marginBottom: "0.2em", marginTop: "0" }}>
        <a href="https://github.com/wapa5pow/table-validator">
          Table Validator for CSV
        </a>
      </h1>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", marginRight: "0.5em" }}>
          <div style={{ marginBottom: "0.5em" }}>
            1. Write your setting yaml
          </div>
          <div style={{ border: "1px solid #000 " }}>
            <CodeMirror
              value={yamlValue}
              height="300px"
              onChange={(value) => {
                setYamlValue(value);
              }}
            />
          </div>
          <CodeMirror
            value={yamlError}
            height="4em"
            theme={errorTheme}
            basicSetup={false}
            readOnly={true}
          />
        </div>
        <div style={{ width: "50%", marginLeft: "0.5em" }}>
          <div style={{ marginBottom: "0.5em" }}>2. Write your csv</div>
          <div style={{ border: "1px solid #000 " }}>
            <CodeMirror
              value={csvValue}
              height="300px"
              onChange={(value) => {
                setCsvValue(value);
              }}
            />
          </div>
          <CodeMirror
            value={csvError}
            height="4em"
            theme={errorTheme}
            basicSetup={false}
            readOnly={true}
          />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: "0.5em" }}>
          3. Validate csv with setting
        </div>
        <div style={{ marginBottom: "1em" }}>
          <button
            type="button"
            onClick={runValidation}
            style={{ height: "3em", width: "10em" }}
          >
            Validate
          </button>
          <div style={{ marginTop: "0.5em" }}>
            Validity:{" "}
            {isValid !== undefined ? (
              isValid ? (
                <span style={{ color: "green" }}>valid</span>
              ) : (
                <span style={{ color: "red" }}>invalid</span>
              )
            ) : (
              ""
            )}
          </div>
          <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
            Last validated at: {lastDate}
          </div>
          <CodeMirror
            value={message}
            height="120px"
            readOnly={true}
            theme={errorTheme}
            basicSetup={false}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
