'use strict';

import HttpError from 'standard-http-error';

/**
 * `EntityNotFoundError`.
 */

class EntityNotFoundError extends HttpError {
  /**
   * Constructor.
   */

  constructor(message, properties) {
    super(404, message, properties);
  }
}

/**
 * Export `EntityNotFoundError`.
 */

export default EntityNotFoundError;
