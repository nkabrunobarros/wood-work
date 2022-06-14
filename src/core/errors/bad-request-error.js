'use strict';

import HttpError from 'standard-http-error';

/**
 * `BadRequestError`.
 */

class BadRequestError extends HttpError {
  /**
   * Constructor.
   */

  constructor(message = 'Bad Request', properties) {
    super(400, message, properties);
  }
}

/**
 * Export `BadRequestError`.
 */

export default BadRequestError;
