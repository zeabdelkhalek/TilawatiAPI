'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DefineForeginKeysSchema extends Schema {
  up () {
    this.table('tilawas', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('surah_id').unsigned().references('id').inTable('surahs').notNullable()
    })

    this.table('comments',(table)=>{
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('tilawa_id').unsigned().references('id').inTable('tilawas').notNullable()
    })

    this.table('notes',(table)=>{
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('tilawa_id').unsigned().references('id').inTable('users').notNullable()
    })

    this.table('tag_tilawa',(table) => {
      table.integer('tilawa_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('tag_id').unsigned().references('id').inTable('users').notNullable()
    })
  }

  down () {
    this.table('define_foregin_keys', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DefineForeginKeysSchema
