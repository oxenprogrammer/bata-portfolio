<?php

/**
 * This File contains BlogController and its methods
 * to handle blog post creation
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

use App\Models\Blog;
use App\Models\BlogImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreBlogRequest;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

/**
 * This File Class handles blog creation
 *
 * PHP version 8
 *
 * @category  Controllers
 * @package    App\Http\Controllers
 * @author     Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link       https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */
class BlogController extends Controller
{
  /**
   * This returns all the blog resources
   *
   * @return void
   */
    public function index()
    {
        //
        $page_title = 'Admin Panel View Blog Posts';
        $blogs = Blog::all();
        return view('blog.index',compact('page_title','blogs'));
    }

    /**
     * This creates blog resource
     *
     * @return void
     */
    public function create()
    {
        //
        $page_title = "Blog Post Create";
        return view('blog.create', compact('page_title'));
    }

    /**
     * This stores created Blog resource
     *
     * @param StoreBlogRequest $request
     * @return void
     */
    public function store(StoreBlogRequest $request)
    {
        // Begin a transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // Create the blog post
            $blog = Blog::create([
                'user_id' => Auth::id(),
                'title' => $request->input('title'),
                'content' => $request->input('content'),
                'excerpt' => $request->input('excerpt'),
                'status' => $request->input('status'),
                'published_at' => $request->input('published_at'),
            ]);

            // Check if images are uploaded
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    // Upload image to Cloudinary and get the URL
                    $uploadedFileUrl = cloudinary()->upload($image->getRealPath(), [
                        'folder' => 'blog_images', // Optional: specify a folder in Cloudinary
                        'public_id' => pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME), // Optional: specify a public ID
                    ])->getSecurePath();

                    // Save image URL to the BlogImage model
                    BlogImage::create([
                        'blog_id' => $blog->id,
                        'image_path' => $uploadedFileUrl,
                    ]);
                }
            }

            // Commit transaction
            DB::commit();

            return redirect()->route('admin.blog.view')->with('success', 'Blog post created successfully!');
        } catch (\Exception $e) {
            // Rollback if there is an error
            DB::rollback();
            return response()->json('failed to save:' . $e->getMessage());

            return redirect()->back()->with('error', 'Failed to create blog post.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

  /**
   * Return blog post for update
   *
   * @param string $id
   * @return void
   */
    public function edit(string $id)
    {
        //
        $page_title ="Admin Panel Edit Blog Post";
        $blog = Blog::with('images')->findOrFail($id);
        return view('blog.edit',compact('page_title','blog'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
