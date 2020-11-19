import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { GroupedSelectField } from '../GroupedSelectField';

const fixtures = {
  'renders with props': {
    label: 'grouped select',
    fieldId: 'field-id',
    groups: [
      {
        groupLabel: 'Ansible',
        options: [
          {
            label: 'Ansible Roles - Ansible Default',
            value: 168,
          },
          {
            label: 'Ansible Roles - Install from git',
            value: 170,
          },
        ],
      },
    ],
    selected: 170,
    setSelected: jest.fn(),
  },
};

describe('GroupedSelectField', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(GroupedSelectField, fixtures));
});
