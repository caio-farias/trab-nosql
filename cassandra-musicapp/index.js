const Cassandra = require('./cassandra')
const { generateSong, generatePlaylist} = require('./utils')

async function main(){
  const Cass = new Cassandra()
  const start = process.hrtime()
  
  const total = 100000
  const batchSize = 20
  const it = Math.floor(total/batchSize)

  
  for(let cycle = 1; cycle <= it; cycle++){
    const batchSongs = []
    const batchPlaylists = []

    for(let batchLength = 0; batchLength < batchSize; batchLength++){
      const song = generateSong()
      batchSongs.push(song)
      const playlist = generatePlaylist()
      batchPlaylists.push(playlist)
    }

    if(it%cycle == 0){
      console.log(`CICLO ---------------------- ${cycle} --`)
      await Cass.insertManySongs(batchSongs, it%cycle == 0)
      await Cass.insertManyPlaylists(batchPlaylists, it%cycle == 0)
      console.log('------------------------------------')
    }else{
      await Cass.insertManySongs(batchSongs, it%cycle == 0)
      await Cass.insertManyPlaylists(batchPlaylists, it%cycle == 0)
    }
  }
  console.log(`Feito em %dms`, process.hrtime(start)[1] / 1000000)
}
main()


