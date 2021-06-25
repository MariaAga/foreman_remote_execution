import React from 'react';
import { mount } from '@theforeman/test';
import { DescriptionField } from '../DescriptionField';

describe('DescriptionField', () => {
  it('rendring', () => {
    const component = mount(
      <DescriptionField
        value="Run %{command}"
        setValue={jest.fn()}
        inputValues={{ command: 'test command' }}
      />
    );
    const preview = component.find('#description-preview').hostNodes();
    const findLink = () => component.find('.pf-m-link.pf-m-inline');
    expect(findLink().text()).toEqual('Set the custom job description');
    expect(preview.props().value).toEqual('Run test command');
    findLink().simulate('click');
    const description = component.find('#description').hostNodes();
    expect(description.props().value).toEqual('Run %{command}');
    expect(findLink().text()).toEqual('See the custom job description');
  });
});
