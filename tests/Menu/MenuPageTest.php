<?php
namespace NewsParserPlugin\Tests\Menu;
use NewsParserPlugin\Menu\Admin\MenuPage;
use NewsParserPlugin\Utils\MenuConfig;


class MenuPageTest extends \WP_UnitTestCase
{
    protected $configPath;
    public function setUp()
    {
        $this->configPath = UTILS_MOCK_DIR.'/menu-config.php';
        wp_set_current_user($this->factory->user->create([
            'role' => 'administrator',
        ]));
    }
    /**
     * @covers NewsParserPlugin\Menu\Admin\MenuPage::init()
     * @covers NewsParserPlugin\Menu\Admin\MenuPage::addMainMenu()
     * @covers NewsParserPlugin\Menu\Admin\MenuPage::addSubMenus()
     * @covers NewsParserPlugin\Menu\Admin\MenuPage::getTemplateRender()
     */
    public function testAddMainMenu()
    {
        $menu_config = new MenuConfig($this->configPath);
        $menu = new MenuPage();
        $menu->init($menu_config);
        $menu->addMainMenu();
        $menu_slug = NEWS_PARSER_PLUGIN_SLUG . '-main-menu';
        $this->assertNotEmpty(menu_page_url($menu_slug, false));

    }
}
