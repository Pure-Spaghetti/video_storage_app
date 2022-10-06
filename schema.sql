

DROP TABLE IF EXISTS files;

CREATE TABLE IF NOT EXISTS files (
    id              serial primary key not null,
    name            varchar ( 255 ),
    size            bigint,
    s3file_object   jsonb,
    type            varchar ( 255 ),
    folder_id       integer default null
);

DROP TABLE IF EXISTS folders;

CREATE TABLE IF NOT EXISTS folders (
    id              serial primary key not null,
    name            varchar ( 255 )
);
