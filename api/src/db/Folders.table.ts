import { runSql } from "./connection";

export default class Folders {

  static async insert(name: string) {
    // Check that the folder doesn't already exist
    const rows = await Folders.findForNames([name]);
    // If a file already exists, throw error
    if (rows.length) throw new Error(`400 Folder with name: (${name}) already exists`);
    // Run query
    return await runSql(`insert into folders ( name ) values ( $1 );`, [name]);
  };

  static async findForNames(names: string[]) {
    const { rows } = await runSql(`select * from folders where name = any ( $1 );`, [names]);
    return rows;
  };

  static async findAll() {
    const { rows } = await runSql(`select * from folders;`);
    return rows;
  };

  static async find(id: string) {
    const { rows } = await runSql(`select * from folders where id = $1;`, [id]);
    return rows;
  };

  static async delete(id: string) {
    await runSql(`delete from folders where id = $1;`, [id]);
  }
};