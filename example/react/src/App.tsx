import { Validator, convertToSchema, convertToTable } from "csvv";
import { useState } from "react";
import "./App.css";

function App() {
  const [schemaFile, setSchemaFile] = useState<File | null>(null);
  const [tableFile, setTableFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Error[] | undefined>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    setErrors(undefined);
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error("FileReader result is null"));
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const validateFiles = async () => {
    if (schemaFile && tableFile) {
      try {
        const schemaText = await readFile(schemaFile);
        const tableText = await readFile(tableFile);

        console.log(schemaText);
        const schema = convertToSchema(schemaText);
        const table = convertToTable(tableText);

        const validator = new Validator();
        const errors = validator.validate(table, schema);

        setErrors(errors);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <label htmlFor="schemaFile" className="file-upload-button">
        Choose schema
        <br />
        <input
          type="file"
          id="schemaFile"
          onChange={(e) => handleFileChange(e, setSchemaFile)}
        />
      </label>
      <br />
      <br />
      <label htmlFor="schemaFile" className="file-upload-button">
        Choose data
        <br />
        <input
          type="file"
          id="dataFile"
          onChange={(e) => handleFileChange(e, setTableFile)}
        />
      </label>
      <br />
      <br />
      <button type="button" onClick={validateFiles}>
        Validate
      </button>
      {errors && (
        <div>
          {errors.length === 0 ? (
            <p>No Error</p>
          ) : (
            errors.map((err, index) => <p key={`${index}`}>{err.message}</p>)
          )}
        </div>
      )}
    </div>
  );
}

export default App;
