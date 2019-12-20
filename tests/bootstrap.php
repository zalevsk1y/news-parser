<?php
namespace 
{
/**
 * PHPUnit bootstrap file
 *
 * @package NewsParserPlugin
 */

$_tests_dir = getenv( 'WP_TESTS_DIR' );
define('PARSER_MOCK_DIR',__DIR__.'/dataMocks/Parser');
define('UTILS_MOCK_DIR',__DIR__.'/dataMocks/Utils');
define('TRAITS_MOCK_DIR',__DIR__.'/dataMocks/Traits');
define('VIEW_MOCK_DIR',__DIR__.'/dataMocks/View');
define('CONTROLLER_MOCK_DIR',__DIR__.'/dataMocks/Controller');
define('MODEL_MOCK_DIR',__DIR__.'/dataMocks/Model');




if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
	echo "Could not find $_tests_dir/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // WPCS: XSS ok.
	exit( 1 );
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require dirname( dirname( __FILE__ ) ) . '/news-parser.php';
	

}

//tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';
require __DIR__.'/../autoload.php';
require __DIR__.'/constants.php';
if(\file_exists(__DIR__.'/../vendor/autoload.php')) require 'vendor/autoload.php';
}
namespace NewsParserPlugin\Utils
{
    /**
     * Stub to avoid using timestamp.
     *
     * @return void
     */
    if (!function_exists('NewsParserPlugin\Utils\time')){
        function time(){
            return 123456789;
        }
    }
}