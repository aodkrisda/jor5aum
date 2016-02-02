<?php
$phar = new Phar('project.phar', 0, 'project.phar');
// add all files in the project
$phar->buildFromDirectory(dirname(__FILE__) . '/rest');
$phar->setStub($phar->createDefaultStub('api.php'));



try {
    $phar = new Phar('phpexcel.phar');
    $phar->extractTo('build/'); // extract all files
} catch (Exception $e) {
    // handle errors
}
