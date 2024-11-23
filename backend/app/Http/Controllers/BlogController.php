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
use App\Http\Resources\BlogResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
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
        return view('blog.index', compact('page_title', 'blogs'));
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
        return response()->json($request);
        // Begin a transaction to ensure data consistency
        DB::beginTransaction();
        try {
            $validatedData = $request->validated();
            // Create the blog post
            $blog = Blog::create([
                'user_id' => Auth::id(),
                'title' =>  $validatedData['title'],
                'content' =>  $validatedData['content'],
                'excerpt' =>  $validatedData['excerpt'],
                'tags'=> $validatedData['tags'],
                'status' =>  $validatedData['status'],
                'published_at' => $validatedData['published_at'],
            ]);

            // Check if images are uploaded
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    // Upload image to Cloudinary and get the URL
                    $uploadedFileUrl = cloudinary()->upload($image->getRealPath(), [
                        'folder' => 'blog_images', // Optional: specify a folder in Cloudinary
                        'public_id' => pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME),
                        'timeout' => 30,
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
            // return response()->json('failed to save:' . $e->getMessage());

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
        $page_title = "Admin Panel Edit Blog Post";
        $blog = Blog::with('images')->findOrFail($id);
        return view('blog.edit', compact('page_title', 'blog'));
    }

    /**
     * Store Blog Updated Resource
     *
     * @param UpdateBlogRequest $request
     * @param string $id
     * @return void
     */
    public function update(UpdateBlogRequest $request, string $id)
    {
        // Begin a database transaction
        DB::beginTransaction();
        try {
            $blog = Blog::findOrFail($id);

            // Handle image deletions
            if ($request->filled('delete_images')) {
                foreach ($request->delete_images as $imageUrl) {
                    // Delete from Cloudinary
                    $publicId = pathinfo($imageUrl, PATHINFO_FILENAME); // Extract public ID from URL
                    cloudinary()->destroy($publicId);
                    // Delete from your BlogImage model
                    BlogImage::where('image_path', $imageUrl)->delete();
                }
            }

            // Handle new image uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $uploadedFileUrl = cloudinary()->upload($image->getRealPath())->getSecurePath();

                    // Save new image URL to the BlogImage model
                    BlogImage::create([
                        'blog_id' => $blog->id,
                        'image_path' => $uploadedFileUrl,
                    ]);
                }
            }

            // Update the blog post details
            $blog->update($request->validated());

            // Commit the transaction
            DB::commit();

            return redirect()->route('admin.blog.view')->with('success', 'Blog post updated successfully.');
        } catch (\Exception $e) {
            // Rollback the transaction on failure
            DB::rollback();

            return redirect()->back()->with('error', 'Failed to update the blog post: ' . $e->getMessage());
        }
    }

    /**
     * Deletes Blog resource and its related images
     *
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        //
        // Find the blog post by ID
        $blog = Blog::findOrFail($id);

        // Begin a transaction
        DB::beginTransaction();

        try {
            // Fetch all associated images
            $images = $blog->images;

            // Delete images from Cloudinary and the BlogImage model
            foreach ($images as $image) {
                // Delete from Cloudinary
                $publicId = pathinfo($image->image_path, PATHINFO_FILENAME); // Extract public ID from URL
                cloudinary()->destroy($publicId);

                // Delete from your BlogImage model
                $image->delete();
            }

            // Delete the blog post itself
            $blog->delete();

            // Commit the transaction
            DB::commit();

            return redirect()->route('admin.blog.view')->with('success', 'Blog post and related images deleted successfully.');
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollBack();

            return redirect()->route('admin.blog.view')->with('error', 'Failed to delete the blog post: ' . $e->getMessage());
        }
    }

    /**
     * Return paginated blog posts with status not equal to 'draft' to be consumed by frontend
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllBlogs(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Set items per page

        try {
            // Fetch blogs where status is not 'draft'
            $blogs = Blog::with(['user', 'images'])
                ->where('status', 'published') // Filter out drafts
                ->paginate($perPage);

            // Check if blogs are empty
            if ($blogs->isEmpty()) {
                return response()->json([
                    'message' => 'No blogs found.',
                ], 404);
            }

            // Return blogs with pagination meta data
            return response()->json([
                'data' => BlogResource::collection($blogs),
                'meta' => [
                    'current_page' => $blogs->currentPage(),
                    'last_page' => $blogs->lastPage(),
                    'per_page' => $blogs->perPage(),
                    'total' => $blogs->total(),
                ],
            ]);
        } catch (\Exception $e) {
            // Handle any exceptions that occur
            return response()->json([
                'message' => 'An error occurred while fetching blogs. Please try again later.',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }


    /**
     * Return a single blog post with status not equal to 'draft' to be consumed by frontend
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSingleBlog(string $id)
    {
        try {
            // Fetch blog where status is not 'draft'
            $blog = Blog::where('id', $id)
                ->where('status', 'published') 
                ->first(); 
    
            // Check if blog is found
            if (!$blog) {
                return response()->json([
                    'message' => 'Blog post not found or is a draft.',
                ], 404); 
            }
    
            // Return the blog resource
            return new BlogResource($blog);
        } catch (\Exception $e) {
            // Handle any exceptions that occur
            return response()->json([
                'message' => 'An error occurred while fetching the blog post. Please try again later.',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }
    
}
