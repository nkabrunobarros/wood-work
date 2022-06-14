'use strict';

import HttpError from 'standard-http-error';

/**
 * `ForbiddenError`.
 */

class ForbiddenError extends HttpError {
  /**
   * Constructor.
   */

  constructor(properties) {
    super(403, 'Permission Denied', properties);
  }
}

/**
 * Export `ForbiddenError`.
 */

export default ForbiddenError;
