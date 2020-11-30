import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { formatter } from '../Formatter';

const baseFixture = {
  id: 11,
  name: 'template field',
};

const fixtures = {
  text: {
    ...baseFixture,
    value_type: 'plain',
    default: 'some default',
    hidden_value: true,
  },
  select: {
    ...baseFixture,
    value_type: 'plain',
    advanced: true,
    options: 'a\r\nb',
  },
  search: {
    ...baseFixture,
    value_type: 'search',
    resource_type: 'ansible_roles',
  },
  datetime: { ...baseFixture, value_type: 'date', required: true },
};

describe('formatter', () =>
  testComponentSnapshotsWithFixtures(formatter, fixtures));
