<?php
/**
 * This file contains console routes for the application.
 *
 * @category Routing
 * @package  Routes
 * @version  1.0
 * @author   Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link     https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */

/**
 * Console commands configuration
 *
 * Defines console commands for Artisan.
 *
 * @category Routing
 * @package  Routes
 * @version  1.0
 * @author   Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link     https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command(
    'inspire', function () {
        $this->comment(Inspiring::quote());
    }
)->purpose('Display an inspiring quote')->hourly();
