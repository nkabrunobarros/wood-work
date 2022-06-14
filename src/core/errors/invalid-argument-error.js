'use strict';

import HttpError from 'standard-http-error';

/**
 * `InvalidArgumentError`.
 */

class InvalidArgumentError extends HttpError {
  /**
   * Constructor.
   */

  constructor(message, properties) {
    super(500, message, properties);
  }
}

/**
 * Export `InvalidArgumentError`.
 */

export default InvalidArgumentError;
