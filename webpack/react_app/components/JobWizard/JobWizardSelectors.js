import {
  selectAPIResponse,
  selectAPIStatus,
} from 'foremanReact/redux/API/APISelectors';

import { JOB_TEMPLATES, JOB_CATEGORIES, JOB_TEMPLATE } from './JobWizardConsts';

export const selectJobTemplatesStatus = state =>
  selectAPIStatus(state, JOB_TEMPLATES);

export const selectJobTemplates = state =>
  selectAPIResponse(state, JOB_TEMPLATES)?.results?.filter(
    template => !template.snippet
  ) || [];

export const selectJobCategories = state =>
  selectAPIResponse(state, JOB_CATEGORIES).job_categories || [];

export const selectJobCategoriesStatus = state =>
  selectAPIStatus(state, JOB_CATEGORIES);

export const selectJobTemplate = state =>
  selectAPIResponse(state, JOB_TEMPLATE) || {};
