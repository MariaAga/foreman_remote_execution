import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import {
  EffectiveUserField,
  TimeoutToKillField,
  PasswordField,
  KeyPassphraseField,
  EffectiveUserPasswordField,
  ConcurrencyLevelField,
  TimeSpanLevelField,
  TemplateInputsFields,
} from '../Fields';

const fixtures = {
  'renders ': { value: 'some value', setValue: jest.fn() },
};

describe('Fields', () => {
  describe('EffectiveUserField', () =>
    testComponentSnapshotsWithFixtures(EffectiveUserField, fixtures));

  describe('TimeoutToKillField', () =>
    testComponentSnapshotsWithFixtures(TimeoutToKillField, fixtures));

  describe('PasswordField', () =>
    testComponentSnapshotsWithFixtures(PasswordField, fixtures));

  describe('KeyPassphraseField', () =>
    testComponentSnapshotsWithFixtures(KeyPassphraseField, fixtures));

  describe('EffectiveUserPasswordField', () =>
    testComponentSnapshotsWithFixtures(EffectiveUserPasswordField, fixtures));

  describe('ConcurrencyLevelField', () =>
    testComponentSnapshotsWithFixtures(ConcurrencyLevelField, fixtures));

  describe('TimeSpanLevelField', () =>
    testComponentSnapshotsWithFixtures(TimeSpanLevelField, fixtures));

  describe('TemplateInputsFields', () =>
    testComponentSnapshotsWithFixtures(TemplateInputsFields, fixtures));
});
