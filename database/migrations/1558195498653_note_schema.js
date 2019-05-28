'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoteSchema extends Schema {
  up () {
    this.create('notes', (table) => {
      table.increments()
      table.integer('star').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('notes')
  }
}

module.exports = NoteSchema
