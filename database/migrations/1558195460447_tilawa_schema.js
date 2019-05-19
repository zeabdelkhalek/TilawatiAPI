'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TilawaSchema extends Schema {
  up () {
    this.create('tilawas', (table) => {
      table.increments()
      table.string('record').notNullable().unique()
      table.string('title').notNullable().unique()
      table.string('description')
      //table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      //table.integer('surah_id').unsigned().references('id').inTable('surahs').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tilawas')
  }
}

module.exports = TilawaSchema
