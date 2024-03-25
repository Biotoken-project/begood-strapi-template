'use strict';

/**
 * diagnostic-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::diagnostic-report.diagnostic-report');
