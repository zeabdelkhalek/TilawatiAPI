'use strict'

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
const Route = use('Route')

//USER ROUTES
Route.post('/api/register' , 'UserController.register')
Route.post('/api/login' , 'UserController.login')
Route.put('/api/users/update/profile', 'UserController.update')
Route.put('/api/users/update/password', 'UserController.updatePassword')
//TILAWA ROUTES
Route.post('/api/tilawas/add', 'TilawaController.add')
Route.put('/api/tilawas/update/:id', 'TilawaController.update')
Route.delete('/api/tilawas/delete/:id', 'TilawaController.delete')
//COMMENT ROUTES
Route.post('/api/tilawas/:id/comments/add', 'CommentController.add')
Route.put('/api/tilawas/:id/comments/:comment_id/update', 'CommentController.update')
Route.delete('/api/tilawas/:id/comments/:comment_id/delete', 'CommentController.delete')