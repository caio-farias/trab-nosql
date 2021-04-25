-- Este arquivo está em CQL(Cassandra Query Language)

USE musicapp;
CREATE TABLE songs(
id uuid PRIMARY KEY,
title text,
album text,
artist text,
);
CREATE MATERIALIZED VIEW songs_by_title AS
SELECT * FROM musicapp.songs WHERE title IS NOT NULL PRIMARY KEY(title, id);
CREATE MATERIALIZED VIEW songs_by_album AS
SELECT * FROM musicapp.songs WHERE album IS NOT NULL PRIMARY KEY(album, id);
CREATE MATERIALIZED VIEW songs_by_artist AS
SELECT * FROM musicapp.songs WHERE artist IS NOT NULL PRIMARY KEY(artist, id);
CREATE TABLE playlists(
id uuid PRIMARY KEY,
title text,
playlist_songs map<int, text>,
tags set<text>,
);
CREATE MATERIALIZED VIEW playlists_by_title AS
SELECT * FROM playlists WHERE title IS NOT NULL PRIMARY KEY(title, id);
CREATE index on playlists(playlist_songs);
CREATE index on playlists(tags);