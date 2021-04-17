const { names, lastNames, titles, tags } = require('./mock')

const generateSong = () =>{
  const artistName = generateArtist()  
  return {
    title: generateSongTitle(),
    artist: artistName,
    album: `${artistName} - Album ${rnd(1, 100)}`,
  }
}

const generatePlaylist = () => {
  return {
    title: `Playlist ${rnd(1, 1000000)}`,
    setlist: generateSetlist(),
    tags: generatePlaylistTags()
  }
}

function generateArtist() {
  return names[rnd(0, names.length)] + ' ' + lastNames[rnd(0, lastNames.length)]
}

const generateSetlist = () => {
  const nSongs = rnd(0, 50)
  const setlist = []
  for (let index = 0; index < nSongs; index++) {
    let currentSong = {
      order: index,
      title: generateSongTitle(),
      artist: generateArtist()
    } 
    setlist.push(currentSong)
  }
  return setlist
}

const generateSongTitle = () => {
  const nWords = rnd(1, 10)
  let songTitle = ''
  for (let index = 0; index < nWords; index++) {
    songTitle += titles[rnd(0, titles.length)]
    if(index + 1 < nWords)
      songTitle += ' '
  }
  return songTitle
}

const generatePlaylistTags = () => {
  const nTags = rnd(1, 7)
  const pTags = []
  for (let index = 0; index < nTags; index++) {
    pTags.push(tags[rnd(0, tags.length)])
  }
  return pTags
}

const rnd = (min, max) => Math.floor(Math.random() * (max)) + min

module.exports = {
  generateSong: generateSong,
  generatePlaylist: generatePlaylist,
}