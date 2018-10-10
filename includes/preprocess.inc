<?php
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

/**
 * Implements hook_preprocess_page().
 *
 * @param $variables
 *
 * @see page.tpl.php
 */
function ministers_preprocess_page(&$variables) {

  // Add pathToTheme to Drupal.settings in JS.
  drupal_add_js('jQuery.extend(Drupal.settings, { "default_media_img_alt": "' . theme_get_setting('default_media_img_alt') . '" });', 'inline');
}