<?php
/**
 * Console Routes
 *
 * This file contains the definition of console commands for the application.
 * It registers commands that can be executed via the Artisan command-line interface.
 *
 * @package  App\Console
 * @category Routes
 * @version  PHP 8.2
 * @author   Kibooli Felix
 * @license  MIT
 * @link     [URL]
 */

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/**
 * Register the console commands for the application.
 *
 * Commands are defined here to handle specific tasks that can be executed
 * from the command line, such as displaying messages or performing periodic
 * actions.
 *
 * @return void
 */
Artisan::command(
    'inspire', function () {
        $this->comment(Inspiring::quote());
    }
)->purpose('Display an inspiring quote')->hourly();
