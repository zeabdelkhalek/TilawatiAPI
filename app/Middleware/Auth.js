'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth , request , response }, next) {
    try {
      await auth.check()
    } catch (error) {
      return response.status(403).send('No token provided')
    }
    await next()
  }
}

module.exports = Auth
