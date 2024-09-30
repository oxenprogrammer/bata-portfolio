<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreBlogRequest;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $page_title = "Blog Post Create";
        return view('blog.create', compact('page_title'));
    }

    /**
     * Store a newly created resource in storage.
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
                    // Store image and get path
                    $imagePath = $image->store('blog_images', 'public');

                    // Save image path to the BlogImage model
                    BlogImage::create([
                        'blog_id' => $blog->id,
                        'image_path' => $imagePath,
                    ]);
                }
            }

            // Commit transaction
            DB::commit();

            return redirect()->route('admin.blog.view')->with('success', 'Blog post created successfully!');
        } catch (\Exception $e) {
            // Rollback if there is an error
            DB::rollback();

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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
