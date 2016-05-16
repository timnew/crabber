import R from 'ramda'
const SCHEMA_TABLES = ['knex_migrations', 'knex_migrations_lock']
const dataTableFilter = R.without(SCHEMA_TABLES)

const showTables = async () => {
  const response = await knex.raw('show tables;')

  const rows = response[0]
  const colDefs = response[1]

  const colName = colDefs[0].name
  const tables = R.pluck(colName, rows)

  return tables
}

const cleanDatabase = async () => {
  const dataTables = dataTableFilter(await showTables())
  return Promise.all(dataTables.map((table) => knex(table).truncate()))
}

useEnv.register('db', () => {
  afterEach(cleanDatabase)
})
