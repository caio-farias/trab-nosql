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
        console.log(err)
      }else{
        console.table(res.rows)
      }
    })
  }

  selectPlaylistByTags = async (params) => {
    const query = 'SELECT * FROM playlists_by_title WHERE tags CONTAINS ? ALLOW FILTERING'
    this.client.execute(query, params, function(err, res) {
      if(err){
        console.log(err)
      }else{
        console.table(res.rows)
      }
    });
  }

  selectPlaylistSongsByTitle= async (params) => {
    const query = 'SELECT playlist_songs FROM playlists_by_title WHERE title=?'
    this.client.execute(query, params, function(err, res) {
      if(err){
        console.log(err)
      }else{
        console.table(res.rows)
      }
    });
  }

  insertSong = async (params) => {
    const query  = 'INSERT INTO songs (id, artist, album, title) VALUES (now(), ?, ?, ?)'
    this.client.execute(query , params, function (err, res){
      if(err){
        console.log(err)
      }else{
        console.log(res)
      }
    })
  }

  insertManySongs = async (params, cycleCondition) => {
    const insert = 'INSERT INTO songs (id, artist, album, title) VALUES (now(), ?, ?, ?)'
    const queries = []
    params.forEach(song => {
      queries.push({query: insert, params: song})
    })
    if(queries.length > 0)
      await this.insertBatch(queries, {cycleCondition: cycleCondition, type: 'songs'})
  }

  insertManyPlaylists = async (params, cycleCondition) => {
    const insert = 'INSERT INTO playlists (id, title, tags, playlist_songs) VALUES (now(), ?, ?, ?)'
    const queries = []
    params.forEach(playlist => {
      queries.push({query: insert, params: playlist})
    })
    if(queries.length > 0)
      await this.insertBatch(queries, {cycleCondition: cycleCondition, type: 'playlists'})
  }

  insertBatch = async(queries, info) => {
    const { cycleCondition, type } = info
    const start = process.hrtime()
    await this.client.batch(queries, { prepare: true, readTimeout: 30000, traceQuery: true, captureStackTrace: true })
    const end = process.hrtime(start)[1] / 1000000
    if(cycleCondition)
      console.log(`Batch ${type} inserida em ${end}ms!`)
  }
  
  insertPlaylist = async (params) => {
    const query  = 'INSERT INTO playlists (id, title, tags, playlist_songs) VALUES(now(), ?, ?, ?)'
    this.client.execute(query , params, { prepare: true } ,function (err, res){
      if(err){
        console.log(err)
      }else{
        console.log(res)
      }
    })
  }
}

module.exports = Cassandra
