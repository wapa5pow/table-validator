import CodeMirror from "@uiw/react-codemirror";
import {
  Schema,
  Table,
  ValidationError,
  Validator,
  convertToSchema,
  convertToTable,
} from "csvv";
import React from "react";
import "./App.css";

const defaultYaml = `
columns:
  - id: id
    rule: notEmpty unique
  - id: 都道府県
    rule: is("東京都") or is("神奈川県") or is("大阪府")
  - id: 県庁所在地
    rule: integer
`
  .replace(/^\n/, "")
  .replace(/\n$/, "");
const defaultCsv = `
id,都道府県,県庁所在地,人口
1,東京都,東京23区,9272740
2,神奈川,横浜市,3724840.5
3,大阪府,大阪市,2691185
`
  .replace(/^\n/, "")
  .replace(/\n$/, "");

function App() {
  const [yamlValue, setYamlValue] = React.useState(defaultYaml);
  const [yamlError, setYamlError] = React.useState("");
  const [csvValue, setCsvValue] = React.useState(defaultCsv);
  const [csvError, setCsvError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [lastDate, setLastDate] = React.useState("");
  const [isValid, setIsValid] = React.useState<boolean | undefined>(undefined);
  const [unknownError, setUnknownError] = React.useState("");

  const runValidation = async () => {
    setLastDate(new Date().toString());
    setYamlError("");
    setCsvError("");
    setUnknownError("");
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
    try {
      table = convertToTable(csvValue, true);
    } catch (err) {
      setCsvError(`${err}`);
      return;
    }

    try {
      const validator = new Validator();
      const errors: ValidationError[] = validator.validate(table, schema);
      if (errors.length === 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
        messages.push(...errors.map((e) => `${e.message}`));
      }
    } catch (error) {
      setUnknownError(`${error}`);
    }
    setMessage(messages.join("\n"));
  };

  return (
    <div style={{ margin: "1em" }}>
      <h1 style={{ padding: 0, marginBottom: "0.2em", marginTop: "0" }}>
        CSV Validator
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
          <div style={{ color: "red", minHeight: "2em" }}>
            {yamlError ? yamlError : ""}
          </div>
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
          <div style={{ color: "red", minHeight: "2em" }}>
            {csvError ? csvError : ""}
          </div>
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
          <div style={{ marginTop: "0.5em" }}>
            Last validated at: {lastDate}
          </div>
        </div>
        <div style={{ border: "1px solid #000 " }}>
          <CodeMirror value={message} height="120px" readOnly={true} />
        </div>
        <div style={{ color: "red", minHeight: "2em" }}>
          {unknownError ? unknownError : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
