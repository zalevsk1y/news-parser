<?php
/**
 * Callback function to delete plugin data upon uninstallation.
 *
 * @return void
 */
function my_plugin_uninstall() {
    

    // Delete options
    delete_option('your_plugin_option');

   
}

// Register the uninstallation hook
register_uninstall_hook(__FILE__, 'my_plugin_uninstall');
