'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tilawa extends Model {
    comments (){
        return this.hasMany('App/Models/Comment')
    }

    likes(){
        return this.belongsToMany('App/Models/User').pivotTable('notes').pivotModel('App/Models/Note')
    }

    tags(){
        return this.belongsToMany('App/Models/Tag').pivotTable('tag_tilawas').pivotModel('App/Models/TagTilawa')
    }

    user(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Tilawa
