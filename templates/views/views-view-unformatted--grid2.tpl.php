<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php foreach ($rows as $id => $row): ?>
  <?php if($view->result[$id]->nid !== $last_row_nid) { ?>
        <?php print $row; ?>
        <?php $last_row_nid = $view->result[$id]->nid; ?>
  <?php } ?> 
<?php endforeach; ?>