<?php
/*
*This is to fix the issue of the RSS feed double encoding 
*/
?>
<?php 
print preg_replace(array('/&quot;/', '/&amp;/', '/&#039;/' , '/&amp;#039;/'), array('"', '&', "'","'"), $output);
?>
