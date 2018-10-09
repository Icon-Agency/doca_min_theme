<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

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

/**
 * Include hook_*_alter() hooks.
 */
include_once './' . drupal_get_path('theme', 'ministers') . '/includes/alter.inc';
include_once './' . drupal_get_path('theme', 'ministers') . '/includes/preprocess.inc';