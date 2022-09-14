'use strict';

import axios from '../core/clients/axios';

/**
 * Export `AbstractModel`.
 */

export default class AbstractModel {
  /**
   * Constructor.
   */

  constructor() {
    this.axios = axios;
  }
};