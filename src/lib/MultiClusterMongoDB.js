const { MongoClient } = require("mongodb");

class MultiClusterMongoDB {
  constructor() {
    this.clients = [];
  }

  async addCluster(connectionString) {
    const client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      this.clients.push(client);
      console.log(`Connected to cluster: ${connectionString}`);
    } catch (error) {
      console.error(`Failed to connect to cluster: ${connectionString}`, error);
      throw error;
    }
  }

  async closeAll() {
    for (const client of this.clients) {
      await client.close();
    }
    this.clients = [];
    console.log("All connections closed");
  }

  async query(clusterIndex, dbName, collectionName, query) {
    if (clusterIndex < 0 || clusterIndex >= this.clients.length) {
      throw new Error(`Invalid cluster index: ${clusterIndex}`);
    }
    const client = this.clients[clusterIndex];
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return await collection.find(query).toArray();
  }

  async insertDocument(clusterIndex, dbName, collectionName, document) {
    if (clusterIndex < 0 || clusterIndex >= this.clients.length) {
      throw new Error(`Invalid cluster index: ${clusterIndex}`);
    }
    const client = this.clients[clusterIndex];
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return await collection.insertOne(document);
  }
}

module.exports = MultiClusterMongoDB;
