// export async function removeTestUserAsync(): Promise<null> {
//   const client = new (await import('mongodb')).MongoClient(
//     'mongodb://127.0.0.1:27017',
//   );

//   try {
//     await client.connect();

//     const database = client.db('gkb');

//     const collection = database.collection('chefs');
//     await collection.deleteOne({
//       name: 'Weinberg des Herrn',
//     });
//   } finally {
//     await client.close();
//     return null;
//   }
// }
