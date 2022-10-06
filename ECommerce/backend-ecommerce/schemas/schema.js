import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import banner from './banner';
import product from './product';
import brand from './brand';
import machine from './machine';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    product,
    banner,
    brand,
    machine
  ]),
})
