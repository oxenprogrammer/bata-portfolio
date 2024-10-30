<?php

/**
 * This File contains Newsletter Controller and its methods
 * 
 *
 * PHP version 8
 *
 * @category  Controllers
 * @package    App\Http\Controllers
 * @author     Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link       https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * This is  Newsletter Controller class 
 * 
 *
 * PHP version 8
 *
 * @category  Controllers
 * @package    App\Http\Controllers
 * @author     Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link       https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */
class NewsletterController extends Controller
{
    /**
     * Return newsletter creation form
     *
     * @return void
     */
    public function create()
    {
        //
        $page_title = "Admin Panel Create Newsletter";
        return view('newsletters.create', compact('page_title'));
    }
}
