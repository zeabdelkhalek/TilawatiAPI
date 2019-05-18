'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurahSchema extends Schema {
  up () {
    this.create('surahs', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('surahs')
  }
}

module.exports = SurahSchema
