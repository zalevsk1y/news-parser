<?php
/**
 * Callback function to delete plugin data upon uninstallation.
 *
 * @return void
 */
function my_plugin_uninstall() {
    

    // Delete cron options
    delete_option(NEWS_PURSER_PLUGIN_CRON_OPTIONS_NAME);
     // Delete template options
    delete_option(NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME);

   
}

// Register the uninstallation hook
register_uninstall_hook(__FILE__, 'my_plugin_uninstall');
