module.exports = {
  development: {
    client: 'postgresql',
    searchPath: 'public',
    connection: {
      database: 'tm_development',
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    },
  },
  test: {
    client: 'postgresql',
    searchPath: 'public',
    connection: {
      database: 'tm_test',
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    },
  },
}
