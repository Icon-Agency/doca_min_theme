<?php

/*
 * Implement hook_service_links_alter()
 */
function ministers_service_links_alter(&$links) {
  $links['twitter']['description'] = 'Share via Twitter';
  $links['facebook']['description'] = 'Share via Facebook';
  $links['email']['description'] = 'Share via email';
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
