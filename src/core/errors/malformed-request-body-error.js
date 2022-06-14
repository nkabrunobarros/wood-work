'use strict';

import HttpError from 'standard-http-error';

/**
 * `MalformedRequestBodyError`.
 */

class MalformedRequestBodyError extends HttpError {
  /**
   * Constructor.
   */

  constructor(properties) {
    super(400, 'Malformed Request Body', properties);
  }
}

/**
 * Export `MalformedRequestBodyError`.
 */

export default MalformedRequestBodyError;
