const knex = require('../db/db');

const UserModel = {
  getByUser(user_name) {
    return knex.select().from('user_app').where({ user_name: user_name }).first();
  },

  create(user) {
    return knex.insert({ user_name: user.user_name, user_password: user.user_password}).into('user_app').returning('*');
  },

  delete(id) {
    return knex('user_app').where({ id_user: id }).del();
  },
};

module.exports = UserModel;