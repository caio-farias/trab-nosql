const cassandra = require('cassandra-driver')
const { generateSong, generatePlaylist} = require('./utils')

async function main(exec){
  const URI = "mongodb://localhost:27017?useUnifiedTopology=true"
  const mongo = new Mongo(URI)
  await mongo.connect()

  const total = 100
  const batchSize = total/10
  const it = Math.floor(total/batchSize)
  const dbName = 'musicapp'






  
  for(let ii = 0; ii < it; ii++){
    const batchSongs = []
    const batchPlaylists = []

    for(let jj = 0; jj < batchSize; jj++){
      const song = generateSong()
      batchSongs.push(song)
      const playlist = generatePlaylist()
      batchPlaylists.push(playlist)
    }

    const hrstart = process.hrtime()
    if(exec[1]){
      await mongo.insertMany(dbName, 'songs', batchSongs)
    }
    if(exec[2]){
      await mongo.insertMany(dbName, 'playlists', batchPlaylists)
    }

    console.log(`Inserted in %dms`, process.hrtime(hrstart)[1] / 1000000)
  }
}

main([true, true, true])