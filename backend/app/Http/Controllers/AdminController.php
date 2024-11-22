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

use App\Models\Category;
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

    /**
     * Get Project Categories
     *
     * @return void
     */
    public function projectCategories()
    {
        $categories = Category::select('id', 'name')->get();
        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Categories retrieved successfully.',
        ], 200);
    }

    /**
     * Store resource
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        try {
            $category = new Category();
            $category->name = $request->name;
            $category->save();
            return response()->json([
                'success' => true,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
            ], 500);
        }
        
    }
}
