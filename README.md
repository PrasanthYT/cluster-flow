# Cluster Flow

`clusterflow` is an npm library that simplifies the management of connections to multiple MongoDB clusters and provides an API for common operations such as querying data and inserting documents.

## Installation

To install `clusterflow`, use npm:

```shell
npm install clusterflow
```

## Usage

### Import the Library

To use `clusterflow` in your project, import it at the top of your script:

```javascript
const ClusterFlow = require('clusterflow');
```

### Create an Instance of `ClusterFlow`

Create an instance of `ClusterFlow` to manage your connections to multiple clusters:

```javascript
const clusterFlow = new ClusterFlow();
```

### Add a Cluster Connection

Use the addCluster method to add a connection to a MongoDB cluster:

```javascript
// Add a cluster connection
await clusterFlow.addCluster('mongodb://server1:port1,server2:port2/?replicaSet=rs0');
```

### Perform a Query

Use the query method to perform a query on a specific cluster, database, and collection:

```javascript
// Perform a query on the first cluster
const results = await clusterFlow.query(0, 'myDatabase', 'myCollection', { name: 'Alice' });
console.log('Query results:', results);
```

### Insert a Document

Use the insertDocument method to insert a document into a specific cluster, database, and collection:

```javascript
// Insert a document into the first cluster
const insertResult = await clusterFlow.insertDocument(0, 'myDatabase', 'myCollection', {
    name: 'Bob',
    age: 30,
});
console.log('Insert result:', insertResult);
```

### Close All Connections

When you are done, use the closeAll method to close all cluster connections:

```javascript
// Close all cluster connections
await clusterFlow.closeAll();
```

## API Documentation

### `ClusterFlow`

- addCluster(connectionString: string): Promise<void>
    - Adds a connection to a MongoDB cluster using the provided connection string.
- query(clusterIndex: number, dbName: string, collectionName: string, query: object): Promise<object[]>
    - Performs a query on the specified cluster, database, and collection.
    - clusterIndex: The index of the cluster to query.
    - dbName: The name of the database.
    - collectionName: The name of the collection.
    - query: The query object.
- insertDocument(clusterIndex: number, dbName: string, collectionName: string, document: object): Promise<object>
    - Inserts a document into the specified cluster, database, and collection.
    - clusterIndex: The index of the cluster to insert the document into.
    - dbName: The name of the database.
    - collectionName: The name of the collection.
    - document: The document to insert.
- closeAll(): Promise<void>
    - Closes all cluster connections.

## Example

Here's a complete example demonstrating how to use the clusterflow library:

```javascript
const ClusterFlow = require('clusterflow');

(async function() {
    const clusterFlow = new ClusterFlow();

    // Add a cluster connection
    await clusterFlow.addCluster('mongodb://server1:port1,server2:port2/?replicaSet=rs0');

    // Perform a query
    const results = await clusterFlow.query(0, 'myDatabase', 'myCollection', { name: 'Alice' });
    console.log('Query results:', results);

    // Insert a document
    const insertResult = await clusterFlow.insertDocument(0, 'myDatabase', 'myCollection', {
        name: 'Bob',
        age: 30,
    });
    console.log('Insert result:', insertResult);

    // Close all connections
    await clusterFlow.closeAll();
})();
```

## Error Handling

The `clusterflow` library's methods return promises that may reject if an error occurs. Always handle errors using try/catch blocks:

```javascript
try {
    const results = await clusterFlow.query(0, 'myDatabase', 'myCollection', { name: 'Alice' });
    console.log('Query results:', results);
} catch (error) {
    console.error('Failed to perform query:', error);
}
```

## Issues

If you encounter any issues while using `clusterflow`, please report them on the [GitHub Issues page](https://github.com/PrasanthYT/cluster-flow/issues).

When reporting an issue, please provide as much detail as possible, including:

- Steps to reproduce the issue.
- Error messages and stack traces.
- Your operating system and Node.js version.

Your feedback helps us improve the library. Thank you!

## Contributing

Contributions are welcome! If you would like to contribute to `clusterflow`, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with descriptive messages.
4. Push your branch to GitHub.
5. Submit a pull request.

Please ensure that your code follows the project's coding style and passes all tests.

For more details, please review the [contributing guide](CONTRIBUTING.md).

## License

`clusterflow` is released under the [MIT License](LICENSE).