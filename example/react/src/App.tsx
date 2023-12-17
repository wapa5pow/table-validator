import CodeMirror from "@uiw/react-codemirror";
import { Validator, convertToSchema, convertToTable } from "csvv";
import React from "react";
import "./App.css";

const defaultYaml = `
columns:
  - id: id
    rule: notEmpty
  - id: name
    rule: is("a")`.replace(/^\n/, "");
const defaultCsv = `
id,name
a,d`.replace(/^\n/, "");

function App() {
  const [yamlValue, setYamlValue] = React.useState(defaultYaml);
  const [csvValue, setCsvValue] = React.useState(defaultCsv);
  const [message, setMessage] = React.useState("");
  const [lastDate, setLastDate] = React.useState("");

  const runValidation = async () => {
    setLastDate(new Date().toString());
    const messages: string[] = [];
    try {
      const schema = convertToSchema(yamlValue);
      const table = convertToTable(csvValue, true);
      const validator = new Validator();
      const errors = validator.validate(table, schema);
      if (errors.length === 0) {
        messages.push("Valid csv");
      } else {
        messages.push("Errors");
        messages.push(...errors.map((e) => e.message));
      }
    } catch (error) {
      messages.push("Errors");
      messages.push(`${error}`);
    }
    setMessage(messages.join("\n"));
  };

  return (
    <div style={{ margin: "1em" }}>
      <div style={{ display: "flex", marginBottom: "2em" }}>
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
            Last validated at: {lastDate}
          </div>
        </div>
        <div style={{ border: "1px solid #000 " }}>
          <CodeMirror value={message} height="300px" readOnly={true} />
        </div>
      </div>
    </div>
  );
}

export default App;
