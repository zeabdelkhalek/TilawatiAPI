'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.string('statement', 40).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('tilawa_id').unsigned().references('id').inTable('tilawas').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
