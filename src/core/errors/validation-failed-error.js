'use strict';

import HttpError from 'standard-http-error';
import { omit } from 'lodash';

/**
 * `ValidationFailedError`.
 */

class ValidationFailedError extends HttpError {
  /**
   * Constructor.
   */

  constructor(errors = []) {
    const allErrors = Array.isArray(errors) ? errors : [errors];

    super(400, 'Validation Failed', {
      errors: allErrors.map((error) => omit(error, ['schemaPath']))
    });
  }
}

/**
 * Export `ValidationFailedError`.
 */

export default ValidationFailedError;
