import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormGroup } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import SearchBar from 'foremanReact/components/SearchBar';
import { helpLabel } from './FormHelpers';

export const TemplateSearchField = ({
  name,
  controller,
  labelText,
  required,
  defaultValue,
  setValue,
  values,
}) => {
  const searchQuery = useSelector(
    state => state.autocomplete?.[name]?.searchQuery
  );
  useEffect(() => {
    setValue({ ...values, [name]: searchQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  const id = name.replace(/ /g, '-');
  return (
    <FormGroup
      label={name}
      labelIcon={helpLabel(labelText, name)}
      fieldId={id}
      isRequired={required}
      className="foreman-search-field"
    >
      <SearchBar
        initialQuery={defaultValue}
        data={{
          controller,
          autocomplete: {
            id: name,
            url: `/${controller}/auto_complete_search`,
            useKeyShortcuts: true,
          },
        }}
        onSearch={() => null}
      />
    </FormGroup>
  );
};

TemplateSearchField.propTypes = {
  name: PropTypes.string.isRequired,
  controller: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  required: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};
TemplateSearchField.defaultProps = {
  labelText: null,
  defaultValue: '',
};
