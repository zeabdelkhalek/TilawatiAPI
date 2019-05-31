'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const Helpers = use('Helpers');

Route.group(() => {
	//USER ROUTES
	Route.put('users/update/profile', 'UserController.update');
	Route.put('users/update/password', 'UserController.updatePassword');
	Route.get('users/search', 'UserController.search');
	//TILAWA ROUTES
	Route.post('tilawas/add', 'TilawaController.add');
	Route.put('tilawas/update/:id', 'TilawaController.update');
	Route.delete('tilawas/delete/:id', 'TilawaController.delete');
	Route.get('tilawas/get/:id', 'TilawaController.get');
	Route.get('tilawas/index', 'TilawaController.index');
	//TILAWA SEARCH ROUTES
	Route.get('tilawas/search', 'TilawaController.search');
	Route.get('tilawas/searchBySurah', 'TilawaController.searchBySurah');
	//COMMENT ROUTES
	Route.get('tilawas/:id/comments/index', 'CommentController.index');
	Route.post('tilawas/:id/comments/add', 'CommentController.add');
	Route.put('tilawas/:id/comments/:comment_id/update', 'CommentController.update');
	Route.delete('tilawas/:id/comments/:comment_id/delete', 'CommentController.delete');
	//NOTE ROUTES
	Route.post('tilawas/:id/notes/add', 'NoteController.add');
	Route.delete('tilawas/:id/notes/:note_id/delete', 'NoteController.delete');
})
	.prefix('api')
	.middleware([ 'auth' ]);

Route.group(() => {
	// AUTH ROUTES
	Route.post('register', 'UserController.register');
	Route.post('login', 'UserController.login');
}).prefix('api');
