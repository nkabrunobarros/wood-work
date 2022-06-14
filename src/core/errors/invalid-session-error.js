'use strict';

import InvalidArgumentError from './invalid-argument-error'
/**
 * `InvalidSessionError`.
 */

class InvalidSessionError extends InvalidArgumentError {
  /**
   * Constructor.
   */

  constructor(properties) {
    super('Invalid Session', properties);
  }
}

/**
 * Export `InvalidSessionError`.
 */

export default InvalidSessionError;
