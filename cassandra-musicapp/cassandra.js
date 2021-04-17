const {Client} = require('cassandra-driver');

class Cassandra {
  async connect(){
    this.client = new Client({
      contactPoints: ['h1', 'h2'],
      localDataCenter: 'datacenter1',
      keyspace: 'musicapp'
    })
  }

}

module.exports = Cassandra