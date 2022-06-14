'use strict';

import AbstractModel from '../../models/abstract-model';
// import EntityNotFoundError from '../errors/entity-not-found-error'
// import InvalidArgumentError from '../errors/invalid-argument-error'
// const logger = require('src/core/logging/logger');
// const { validate } = require('src/core/validator');

module.exports = class AbstractManager {
    /**
     * Constructor.
     */
  
    constructor(model) {
      if (!model) {
        // throw new InvalidArgumentError('`model` must not be null');
      }
  
      if (model instanceof AbstractModel === false) {
        // throw new InvalidArgumentError('`model` must be an instance of AbstractModel');
      }
  
      // this.logger = logger(`${model.name}-manager`);
      this.model = model;
      this.query = () => model.knex(model.tableName);
    }
      /**
     * Find.
     */
  
       async find({ limit, transaction, where = {} } = {}) {
        const query = this.query().where(where);
    
        if (limit) {
          query.limit(limit);
        }
    
        if (transaction) {
          query.transacting(transaction);
        }
    
        // this.logger.debug({ query: query.toString() }, `Fetching entities from table ${this.model.tableName}`);
    
        const entities = await query;
    
        if (this.model.virtualAttributes) {
          await this.virtualAttributes(entities);
        }
    
        return entities;
      }
    
      /**
       * Find one.
       */
    
      async findOne({ transaction, where } = {}) {
        const [entity] = await this.find({ limit: '1', transaction, where });
    
        if (!entity) {
          // throw new EntityNotFoundError();
        }
    
        return entity;
      }
    /**
     * Create.
     */
  
    // async create({ data, multiple = false, returning = '*', transaction } = {}) {
    //   this.logger.debug({ data }, `Creating ${this.model.name}`);
  
    //   validate(data, 'empty-object');
    //   validate(data, this.model.name);
  
    //   const queryBuilder = this.query().insert(data).returning(returning);
  
    //   if (transaction) {
    //     queryBuilder.transacting(transaction);
    //   }
  
    //   const entities = await queryBuilder;
  
    //   this.logger.info({ entities }, `Created ${entities.length} entities`);
  
    //   if (this.model.virtualAttributes) {
    //     await this.virtualAttributes(entities);
    //   }
  
    //   return multiple ? entities : entities[0];
    // }
  
    // /**
    //  * Delete.
    //  */
  
    // async delete({ returning = '*', transaction, where }) {
    //   validate({ where }, { properties: { where: { minProperties: 1, type: 'object' } } });
  
    //   const queryBuilder = this.query().delete().returning(returning).where(where);
  
    //   if (transaction) {
    //     queryBuilder.transacting(transaction);
    //   }
  
    //   this.logger.debug({ query: queryBuilder.toString() }, `Deleting entities from table ${this.model.tableName}`);
  
    //   const entities = await queryBuilder;
  
    //   if (entities.length === 0) {
    //     throw new EntityNotFoundError();
    //   }
  
    //   return entities;
    // }
  

  
    /**
     * Update.
     */
  
    // async update({ data, multiple = false, returning = '*', transaction, where } = {}) {
    //   this.logger.debug({ data }, `Updating ${this.model.name}`);
  
    //   validate(data, 'empty-object');
    //   validate(data, this.model.name);
  
    //   const queryBuilder = this.query().returning(returning).update(data).where(where);
  
    //   if (transaction) {
    //     queryBuilder.transacting(transaction);
    //   }
  
    //   const entities = await queryBuilder;
  
    //   this.logger.info({ entities }, `Updated ${entities.length} entities`);
  
    //   if (entities.length === 0) {
    //     throw new EntityNotFoundError();
    //   }
  
    //   if (this.model.virtualAttributes) {
    //     await this.virtualAttributes(entities);
    //   }
  
    //   return multiple ? entities : entities[0];
    // }
  
    /**
     * Virtual attributes.
     */
  
    async virtualAttributes(data) {
      if (Array.isArray(data)) {
        return await Promise.all(data.map((entity) => this.virtualAttributes(entity)));
      }
  
      for (const attribute of this.model.virtualAttributes) {
        data[attribute] = await this.model[attribute](data);
      }
    }
  };