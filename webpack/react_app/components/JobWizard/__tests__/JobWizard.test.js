import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import JobWizardPage from '../index';
import { JobWizard } from '../JobWizard';

const fixtures = {
  'renders ': {},
};
describe('JobWizardPage', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(JobWizardPage, fixtures));
});

describe('JobWizard', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(JobWizard, fixtures));
});
