<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function ministers_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  ministers_preprocess_html($variables, $hook);
  ministers_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function ministers_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  // $variables['classes_array'] =
  //  array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function ministers_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function ministers_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // ministers_preprocess_node_page() or
  // ministers_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function ministers_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function ministers_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] =
  // array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function ministers_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  // $variables['classes_array'][] = 'count-' . $variables['block_id'];
}
// */

function ministers_js_alter(&$javascript) {}

function ministers_taxonomy_term_title($term) {
  if (!isset($term->tid) || !isset($term->name)) {
    if (is_numeric($term)) {
      $term = taxonomy_term_load($term);
    }
    elseif (is_string($term)) {
      $term = taxonomy_get_term_by_name($term);
      if ($term) {
        list($term) = $term;
      }
    }
  }
  if (isset($term->name)) {
    return function_exists('i18n_taxonomy_term_name') ?
        i18n_taxonomy_term_name($term) : taxonomy_term_title($term);
  }
  else {
    return $term;
  }
}

// Inverse Views Year Select Order
function ministers_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'views_exposed_form' && $form['#id'] == 'views-exposed-form-media-tiles-page-list') {
    $form['year_filter']['value']['#process'][] = date_select_desc_process;
  }    
  if ($form_id == 'views_exposed_form' && $form['#id'] == 'views-exposed-form-search-media-page-list') {
    $form['year_filter']['value']['#process'][] = date_select_desc_process;
  } 
}

function date_select_desc_process($element, &$form_state, $form) {
  arsort($element['year']['#options']);
  return $element;
}

function ministers_preprocess_html(&$vars) {
  drupal_add_css(path_to_theme() . '/ie.css', array('weight' => CSS_THEME, 'browsers' => array('IE' => 'IE', '!IE' => FALSE), 'preprocess' => FALSE));
}

/**
 * Implements hook_preprocess_views_view().
 */
function ministers_preprocess_views_view(&$variables) {
  $filters = array();
  foreach ($variables['view']->filter as $filter) {
    if ($filter->options['exposed']) {
      $identifier = $filter->options['is_grouped'] ? $filter->options['group_info']['identifier'] : $filter->options['expose']['identifier'];
      $filters[$identifier] = array(
        'required' => $filter->options['expose']['required'] ? TRUE : FALSE,
      );
    }
  }

  $bef_js['views'][$variables['view']->name]['displays'][$variables['view']->current_display]['filters'] = $filters;
  drupal_add_js(array('better_exposed_filters' => $bef_js), 'setting');
}