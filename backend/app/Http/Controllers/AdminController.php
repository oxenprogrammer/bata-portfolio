<?php
/**
 * This File contains AdminController and its methods
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
 * This is an adminController class 
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
class AdminController extends Controller
{
    //
    /**
     * This method renders the admin panel dashboard
     *
     * @return void
     */
    public function index()
    {
        $page_title ="Admin Panel Dashboard";
        return view('layouts.app',compact('page_title'));
    }
}
