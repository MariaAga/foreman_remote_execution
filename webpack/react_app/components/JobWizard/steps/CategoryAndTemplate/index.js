import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import URI from 'urijs';
import { get } from 'foremanReact/redux/API';
import {
  selectJobCategories,
  selectJobTemplates,
  selectJobCategoriesStatus,
} from '../../JobWizardSelectors';
import { CategoryAndTemplate } from './CategoryAndTemplate';

import { JOB_TEMPLATES, JOB_CATEGORIES } from '../../JobWizardConsts';

const ConnectedCategoryAndTemplate = ({
  jobTemplate,
  setJobTemplate,
  category,
  setCategory,
}) => {
  const dispatch = useDispatch();

  const jobCategoriesStatus = useSelector(selectJobCategoriesStatus);
  useEffect(() => {
    if (!jobCategoriesStatus) {
      dispatch(
        get({
          key: JOB_CATEGORIES,
          url: '/ui_job_wizard/categories',
          handleSuccess: response =>
            setCategory(response.data.job_categories[0] || ''),
        })
      );
    }
  }, [jobCategoriesStatus, dispatch, setCategory]);

  const jobCategories = useSelector(selectJobCategories);

  useEffect(() => {
    if (category) {
      const templatesUrl = new URI('/api/v2/job_templates');
      dispatch(
        get({
          key: JOB_TEMPLATES,
          url: templatesUrl.addSearch({
            search: `job_category="${category}"`,
          }),
        })
      );
    }
  }, [category, dispatch]);

  const jobTemplates = useSelector(selectJobTemplates);

  return (
    <CategoryAndTemplate
      jobTemplates={jobTemplates}
      jobCategories={jobCategories}
      setJobTemplate={setJobTemplate}
      selectedTemplateID={jobTemplate}
      setCategory={setCategory}
      selectedCategory={category}
    />
  );
};

ConnectedCategoryAndTemplate.propTypes = {
  jobTemplate: PropTypes.number,
  setJobTemplate: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};
ConnectedCategoryAndTemplate.defaultProps = { jobTemplate: null };

export default ConnectedCategoryAndTemplate;
