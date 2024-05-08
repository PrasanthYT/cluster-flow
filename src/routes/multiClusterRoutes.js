const express = require("express");
const MultiClusterMongoDB = require("../lib/MultiClusterMongoDB");

const router = express.Router();
const multiClusterMongo = new MultiClusterMongoDB();

// Route to add a new cluster connection
router.post("/add-cluster", async (req, res) => {
  const { connectionString } = req.body;
  try {
    await multiClusterMongo.addCluster(connectionString);
    res.status(200).json({ message: "Cluster connection added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add cluster connection", details: error });
  }
});

// Route to perform a query on a specific cluster
router.post("/query", async (req, res) => {
  const { clusterIndex, dbName, collectionName, query } = req.body;
  try {
    const results = await multiClusterMongo.query(
      clusterIndex,
      dbName,
      collectionName,
      query
    );
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ error: "Failed to perform query", details: error });
  }
});

// Route to insert a document into a specific cluster
router.post("/insert", async (req, res) => {
  const { clusterIndex, dbName, collectionName, document } = req.body;
  try {
    const result = await multiClusterMongo.insertDocument(
      clusterIndex,
      dbName,
      collectionName,
      document
    );
    res.status(200).json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to insert document", details: error });
  }
});

module.exports = router;
