'use strict';

import HttpError from 'standard-http-error';

/**
 * `UnauthorizedError`.
 */

class UnauthorizedError extends HttpError {
  /**
   * Constructor.
   */

  constructor(properties) {
    super(401, 'Bad Credentials', properties);
  }
}

/**
 * Export `UnauthorizedError`.
 */

export default UnauthorizedError;
