'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagTilawaSchema extends Schema {
  up () {
    this.create('tag_tilawas', (table) => {
      table.increments()
      table.integer('tilawa_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('tag_id').unsigned().references('id').inTable('users').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tag_tilawas')
  }
}

module.exports = TagTilawaSchema
