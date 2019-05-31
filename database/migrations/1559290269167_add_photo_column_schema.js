'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddPhotoColumnSchema extends Schema {
	up() {
		this.alter('users', (table) => {
			table.string('photo', 255).notNullable();
		});
	}

	down() {
		this.alter('users', (table) => {
			table.dropColumn('photo')
		});
	}
}

module.exports = AddPhotoColumnSchema;
