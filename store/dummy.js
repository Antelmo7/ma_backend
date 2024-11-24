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

async function query(table, qu) {
  let col = await list(table);
  let keys = Object.keys(qu);
  let key = keys[0];

  return col.filter(item => item[key] === qu[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  query
}