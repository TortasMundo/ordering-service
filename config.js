const KnexFile = require('knexfile')
const Knex = require('knex')
const testKnex = Knex(KnexFile['test'])
const devKnex = Knex(KnexFile['development'])

module.exports = {
  port: process.env.PORT || 4002,
  redis_host: process.env.REDISCLOUD_URL || 'caching:6379',
  getKnex: isTest => (isTest ? testKnex : devKnex)
}
