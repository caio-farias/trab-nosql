const { Client } = require("cassandra-driver")
const dbName = 'musicapp'
class Cassandra {

  constructor() {
    this.client = new Client({
      contactPoints: ['localhost'],
      localDataCenter: "datacenter1",
      keyspace: dbName,
    })
  }

  selectSongByTitle = async (params) => {
    const query = "SELECT * FROM songs_by_title WHERE title=?"
    this.client.execute(query, params, function(err, res) {
      if(err){
        console.log(err);
      }else{
        console.table(res.rows);
      }
    });
  }

  selectPlaylistByTags = async (params) => {
    const query = 'SELECT * FROM playlists_by_title WHERE tags CONTAINS ? ALLOW FILTERING'
    this.client.execute(query, params, function(err, res) {
      if(err){
        console.log(err);
      }else{
        console.table(res.rows);
      }
    });
  }

  selectPlaylistSongs= async (params) => {
    const query = 'SELECT playlist_songs FROM playlists_by_title WHERE title=?';
    this.client.execute(query, params, function(err, res) {
      if(err){
        console.log(err);
      }else{
        console.table(res.rows);
      }
    });
  }

  insertSong = async (params) => {
    const query  = 'INSERT INTO songs (id, artist, album, title) VALUES (now(), ?, ?, ?)'
    this.client.execute(query , params, function (err, res){
      if(err){
        console.log(err);
      }else{
        console.log(res);
      }
    })
  }

  insertBatch = async(queries) => {
    await this.client.batch(queries, { prepare: true });
    console.log('Data updated on cluster');
  }
  
  insertPlaylist = async (params) => {
    const query  = 'INSERT INTO playlists (id, title, playlist_songs, tags) VALUES(now(), ?, ?)'
    this.client.execute(query , params, function (err, res){
      if(err){
        console.log(err);
      }else{
        console.table(res.table);
      }
    })
  }
}

module.exports = Cassandra;
