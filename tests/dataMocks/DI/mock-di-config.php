<?php
namespace NewsParserPlugin;

return array(
    \NewsParserPlugin\Tests\DI\TestClass1::class=>array(\NewsParserPlugin\Tests\DI\TestClass2::class,\NewsParserPlugin\Tests\DI\TestClass3::class),
    \NewsParserPlugin\Tests\DI\TestClass2::class=>array(\NewsParserPlugin\Tests\DI\TestClass4::class),
    \NewsParserPlugin\Tests\DI\TestClass3::class=>array('a'),
    \NewsParserPlugin\Tests\DI\TestClass4::class=>array()
);