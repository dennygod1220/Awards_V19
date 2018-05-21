'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    //當路徑有錯時，處理方法
    // response.status(error.status).send(error.message)
    // response.route('/errorpage')   
    console.log(error.message);
    if(error.message == "E_INVALID_SESSION: Invalid session"){
      response.route('/AudreySP/auth/signin')
    }
    else if(error.message == "EBADCSRFTOKEN: Invalid CSRF token"){
      response.route('/AudreySP/')
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
