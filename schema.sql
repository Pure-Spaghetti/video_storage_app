DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS folders;
/*
 * folders
 */
CREATE TABLE IF NOT EXISTS folders (
    id              serial primary key not null,
    name            varchar ( 255 )
);

/*
 * files
 */
CREATE TABLE IF NOT EXISTS files (
    id              serial primary key not null,
    name            varchar ( 255 ),
    size            bigint,
    s3file_object   jsonb,
    type            varchar ( 255 ),
    folder_id       integer references folders(id) default null,
    temp_file_name  varchar ( 255 )
);
CREATE UNIQUE INDEX folder_id_idx ON files (folder_id);
CREATE UNIQUE INDEX name_idx ON files (name);
