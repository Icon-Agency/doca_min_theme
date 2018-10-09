<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 * 
 * Custom statement added to check for duplicate node outout that appear together.
 * This can sometimes occur when a node has multiple terms and therefore produces multple results
 * 
 */
?>
<?php if (!empty($title)): ?>
  <h2><?php print $title; ?></h2>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
  <?php if($view->result[$id]->nid !== $last_row_nid) { ?>
      <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
        <?php print $row; ?>
        <?php $last_row_nid = $view->result[$id]->nid; ?>
      </div>
  <?php } ?> 
<?php endforeach; ?>