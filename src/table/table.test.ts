import { describe, expect, it } from "@jest/globals";
import { convertToTable } from "./table";

describe("convertToTable", () => {
  it("should return Table without header", () => {
    const content = `
id,country,capital,population
1,China,Beijing,21542000
2,Japan,Tokyo,14094034
3,Russia,Moscow,13104177
`;
    const table = convertToTable(content, true);
    expect(table.rows).toHaveLength(3);
    expect(table.rows[1].cellValues).toHaveLength(4);
  });

  it("should return table from missing column", () => {
    const content = `
id,country,capital,population
1,China,Beijing,21542000
2,Japan,Tokyo
3,Russia,Moscow,13104177
`;
    const table = convertToTable(content, true);
    expect(table.rows).toHaveLength(3);
    expect(table.rows[1].cellValues).toHaveLength(3);
  });
});
