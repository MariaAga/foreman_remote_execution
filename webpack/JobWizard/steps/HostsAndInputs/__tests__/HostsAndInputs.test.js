import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, screen, render, act } from '@testing-library/react';
import * as api from 'foremanReact/redux/API';
import { JobWizard } from '../../../JobWizard';
import JobWizardPage from '../../../';
import * as selectors from '../../../JobWizardSelectors';
import { testSetup, mockApi } from '../../../__tests__/fixtures';

const store = testSetup(selectors, api);
mockApi(api);
const lodash = require('lodash');

lodash.debounce = fn => fn;

describe('Hosts', () => {
  it('Host selection chips removal and keep state between steps', async () => {
    render(
      <Provider store={store}>
        <JobWizard />
      </Provider>
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Target hosts and inputs'));
    });
    const select = () => screen.getByRole('button', { name: 'Options menu' });
    fireEvent.click(select());
    await act(async () => {
      fireEvent.click(screen.getByText('host1'));
      fireEvent.click(screen.getByText('host2'));
    });
    fireEvent.click(
      screen.getByText('Hosts', { selector: '.pf-c-select__toggle-text' })
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Host groups'));
    });
    fireEvent.click(select());
    await act(async () => {
      fireEvent.click(screen.getByText('host_group1'));
    });
    fireEvent.click(select());
    expect(screen.queryAllByText('host1')).toHaveLength(1);
    expect(screen.queryAllByText('host2')).toHaveLength(1);
    expect(screen.queryAllByText('host3')).toHaveLength(0);
    const chip1 = screen.getByRole('button', { name: 'Close host1 host1' });
    await act(async () => {
      fireEvent.click(chip1);
    });
    expect(screen.queryAllByText('host1')).toHaveLength(0);
    expect(screen.queryAllByText('host3')).toHaveLength(0);
    expect(screen.queryAllByText('host2')).toHaveLength(1);
    expect(screen.queryAllByText('host_group1')).toHaveLength(1);

    fireEvent.click(
      screen.getByText('Host groups', { selector: '.pf-c-select__toggle-text' })
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Category and Template'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Target hosts and inputs'));
    });
    expect(screen.queryAllByText('host2')).toHaveLength(1);
    expect(screen.queryAllByText('host_group1')).toHaveLength(1);
  });
  it('Host fill list from url', async () => {
    render(
      <Provider store={store}>
        <JobWizard fills={{ 'host_ids[]': ['host1', 'host3'] }} />
      </Provider>
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Target hosts and inputs'));
    });
    api.get.mock.calls.forEach(call => {
      if (call[0].key === 'HOST_IDS') {
        expect(call[0].params).toEqual({ search: 'id = host1 or id = host3' });
      }
    });

    expect(screen.queryAllByText('host1')).toHaveLength(1);
    expect(screen.queryAllByText('host2')).toHaveLength(0);
    expect(screen.queryAllByText('host3')).toHaveLength(1);
  });
  it('Host fill search from url', async () => {
    render(
      <Provider store={store}>
        <JobWizard fills={{ search: 'os = gnome' }} />
      </Provider>
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Target hosts and inputs'));
    });
    expect(screen.queryAllByText('os = gnome')).toHaveLength(1);
  });

  it('input fill from url', async () => {
    const inputText = 'test text';
    render(
      <Provider store={store}>
        <JobWizardPage
          location={{
            search: `feature=test_feature&inputs[plain hidden]=${inputText}`,
          }}
        />
      </Provider>
    );
    api.get.mock.calls.forEach(call => {
      if (call[0].key === 'REX_FEATURE') {
        expect(call[0].url).toEqual(
          '/api/remote_execution_features/test_feature'
        );
      }
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Target hosts and inputs'));
    });
    const textField = screen.getByLabelText('plain hidden', {
      selector: 'textarea',
    });
    expect(textField.value).toBe(inputText);
  });
});
