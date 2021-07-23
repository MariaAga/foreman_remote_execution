class UiJobWizardController < ApplicationController
  include FiltersHelper
  def categories
    job_categories = resource_scope
                     .search_for("job_category ~ \"#{params[:search]}\"")
                     .select(:job_category).distinct
                     .reorder(:job_category)
                     .pluck(:job_category)
    render :json => {:job_categories =>job_categories, :with_katello => with_katello, default_category:default_category,default_template:default_template.id}
  end

  def template
    job_template = JobTemplate.authorized.find(params[:id])
    advanced_template_inputs, template_inputs = map_template_inputs(job_template.template_inputs_with_foreign).partition { |x| x["advanced"] }
    render :json => {
      :job_template => job_template,
      :effective_user => job_template.effective_user,
      :template_inputs => template_inputs,
      :advanced_template_inputs => advanced_template_inputs,
    }
  end

  def default_category
    return default_template&.job_category
  end

  def default_template
    setting_value = Setting['remote_execution_form_job_template']
    return nil unless setting_value

    template = JobTemplate.find_by :name => setting_value
    return nil unless template
    template
  end

  def resource_name(nested_resource = nil)
    nested_resource || 'job_template'
  end

  def map_template_inputs(template_inputs_with_foreign)
    template_inputs_with_foreign.map { |input| input.attributes.merge({:resource_type => input.resource_type&.tableize, :url => search_path(input.resource_type&.tableize) }) }
  end

  def with_katello
    defined?(::Katello) ? true : false
  end

  def resource_class
    JobTemplate
  end

  def action_permission
    :view_job_templates
  end
end
