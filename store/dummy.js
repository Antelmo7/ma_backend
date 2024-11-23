const db = {
  users: [
    {id: '1', name: 'antelmo', username: 'antv7', age: 20}
  ]
}

async function list(table) {
  return db[table];
}

async function get(table, id) {
  let col = await list();
  return col.filter(item => item.id === id) || null;
}

async function upsert(table, data) {
  if (!db[table]) db[table] = []

  db[table].push(data);
  console.log(db);
}

module.exports = {
  list,
  get,
  upsert,
}