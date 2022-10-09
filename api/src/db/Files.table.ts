import { runSql } from "./connection";

export default class Files {

  static async insert(files: Express.Multer.File[]) {
    // Build query
    let sql = `insert into files ( name, size, type, temp_file_name ) values `;
    // Check that none of the files have been uploaded already
    const fileNames = files.map(file => file.originalname);
    const rows = await Files.findForNames(fileNames);
    // If a file already exists, throw error
    if (rows.length) throw new Error(`400 files with names: (${rows.map(row => row.name).join(", ")}) already exists`);
    for (let i = 0; i < files.length * 4; i += 4) {
      // Add file to query string
      sql += `($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4})${i === files.length * 4 - 4 ? ";" : ",\n"}`;
    }
    const params: string[] = files.map((file) => ([file.originalname, file.size.toString(), file.mimetype, file.filename])).flat();
    // Run query
    return await runSql(sql, params);
  };

  static async addFileToFolder(fileId: string, folderId: string) {
    return await runSql(`update files set folder_id = $1 where id = $2;`, [folderId, fileId]);
  }

  static async findForNames(names: string[]) {
    const { rows } = await runSql(`select * from files where name = any ( $1 );`, [names]);
    return rows;
  };

  static async findForFolderId(folderId: string) {
    const { rows } = await runSql(`select * from files where folder_id = $1;`, [folderId]);
    return rows;
  };

  static async findAll() {
    const { rows } = await runSql(`select * from files;`);
    return rows;
  };

  static async find(id: string) {
    const { rows } = await runSql(`select * from files where id = $1;`, [id]);
    return rows;
  };

  static async delete(id: string) {
    await runSql(`delete from files where id = $1;`, [id]);
  }
};