// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: process.env.DB_DRIVER || 'pg',
    connection: {
      host: process.env.UP_DB_HOST,
      
      port: process.env.DB_PORT,
      user: process.env.UP_DB_USERNAME,
      password: process.env.UP_DB_PASSWORD,
      database: process.env.UP_DB_NAME,
      ssl: {
        rejectUnauthorized: false // Puedes establecer rejectUnauthorized en false para deshabilitar la verificación del certificado SSL
      }
    },
    connection: process.env.PG_CONNECTION_STRING,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
