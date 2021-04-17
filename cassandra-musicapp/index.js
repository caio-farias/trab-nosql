const Cassandra = require('./cassandra')
const { generateSong, generatePlaylist} = require('./utils')

async function main(exec){
  const Cass = new Cassandra();
  
  const total = 100
  const batchSize = total/10
  const it = Math.floor(total/batchSize)

  const params =  [['ARTIST1', 'ALBUM1', 'SONG5'], ['ARTIST1', 'ALBUM1', 'SONG6']]
  const insert = 'INSERT INTO songs (id, artist, album, title) VALUES (now(), ?, ?, ?)'
  const queries = [
    {
      query: insert,
      params: params[0]
    },
    {
      query: insert,
      params: params[1]
    }
  ]

  // Cass.insertBatch(queries)
  Cass.selectSongByTitle(['SONG6'])
}



main([true, true, true])