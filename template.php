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

<<<<<<< HEAD

/**
 * Include hook_*_alter() hooks.
 */
include_once './' . drupal_get_path('theme', 'ministers') . '/includes/alter.inc';
=======
/**
 * Implements hook_preprocess_node().
 */
function ministers_preprocess_node(&$variables, $hook) {
  // Add a theme hook suggestion for type and view mode.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__' . $variables['view_mode'];

  // _template_preprocess_node__{content_type}__{view mode}
  $possible_hook_name = '_' . __FUNCTION__ . '__' . $variables['type'] . '__' . $variables['view_mode'];

  if (function_exists($possible_hook_name)) {
    $possible_hook_name($variables);
  }
  else {
    // _template_preprocess_node__{content_type}
    $possible_hook_name = '_' . __FUNCTION__ . '__' . $variables['type'];
    if (function_exists($possible_hook_name)) {
      $possible_hook_name($variables);
    }
  }
}

/**
 * Called by ministers_preprocess_node().
 */
function _ministers_preprocess_node__media__full(&$variables) {

  // Populate created date in to service links container.
  $post_date = [
    'post_date' => [
      '#type' => 'container',
      '#attributes' => [
        'class' => [
          'date-bar-above-body',
        ],
      ],
      'post_date_mk' => [
        '#type' => 'markup',
        '#markup' => '<div class="media-post-date-wrapper"><time datetime="'
                     . format_date($variables['created'], 'custom', 'c')  . '">'
                     . '<strong>'
                     . format_date($variables['created'], 'custom', 'd M Y')
                     . '</strong>'
                     . '</time></div>',
        '#weight' => '-999',
      ],
    ],
  ];

  if (isset($variables['content']['service_links'])){
    $post_date['post_date']['service_links'] = $variables['content']['service_links'];
    unset($variables['content']['service_links']);
  }

  $variables['content'] = $post_date + $variables['content'];

  // Filtering first manually inserted post date out.
  if (isset($variables['content']['body'][0]['#markup'])){
    $variables['content']['body'][0]['#markup'] = preg_replace('/^<p>(<strong>)?\d+\s\w*\s\d\d\d\d(<\/strong>)?<\/p>/i', '', $variables['content']['body'][0]['#markup']);
  }
}
>>>>>>> ebff511da5773b85da20b77a68bb534b2076cdf9
