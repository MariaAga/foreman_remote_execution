import React from 'react';
import * as patternfly from '@patternfly/react-core';
import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { QueryType } from '../QueryType';

jest.spyOn(patternfly, 'FormGroup');
patternfly.FormGroup.mockImplementation(props => <div props={props} />);
const fixtures = {
  renders: {},
};

describe('QueryType', () => {
  testComponentSnapshotsWithFixtures(QueryType, fixtures);
});
