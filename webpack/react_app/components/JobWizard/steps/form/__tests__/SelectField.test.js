import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { SelectField } from '../SelectField';

const fixtures = {
  'renders with props': {
    label: 'grouped select',
    fieldId: 'field-id',
    options: ['Commands'],
    value: 'Commands',
    setValue: jest.fn(),
  },
};

describe('SelectField', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(SelectField, fixtures));
});
