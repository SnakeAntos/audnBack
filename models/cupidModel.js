const knex = require("../db/db");

const CupidModel = {
    getByUserId(userId) {
        return knex.select().from('cupid').where('user_id', userId);
      },

  create(cupid) {
    return knex
      .insert({
        user_id: cupid.user_id,
        song_id: cupid.song_id,
        is_match: cupid.is_match,
        
      })
      .into("cupid")
      .returning("*");
  },

  delete(id) {
    return knex("cupid").where({ id_cupid: id }).del();
  },

  getAllSongs() {
    return knex.select().from("cupid");
  },
};

module.exports = CupidModel;
