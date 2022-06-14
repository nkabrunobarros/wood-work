'use strict';

import HttpError from 'standard-http-error';

/**
 * `ConflictError`.
 */

class ConflictError extends HttpError {
  /**
   * Constructor.
   */

  constructor(message, properties) {
    super(409, message, properties);
  }
}

/**
 * Export `ConflictError`.
 */

export default ConflictError;
