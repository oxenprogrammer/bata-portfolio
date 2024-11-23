<?php

/**
 * This File contains Document Controller and its methods
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

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\DocumentResource;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

/**
 * This is  Document Controller class 
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
class DocumentController extends Controller
{
    /**
     * This function returns all the list of the created documents
     *
     * @return void
     */
    public function index()
    {
        //
        $page_title = "Admin Panel View Document";
        $documents = Document::all();
        return view('documents.index', compact('page_title', 'documents'));
    }

    /**
     * This function creates a document resource
     *
     * @return void
     */
    public function create()
    {
        //
        $page_title = "Admin Panel Create Project";
        return view('documents.create', compact('page_title'));
    }

    /**
     * This function stores document resource
     *
     * @param StoreDocumentRequest $request
     * @return void
     */
    public function store(StoreDocumentRequest $request)
    {
        $validatedData = $request->validated();
        $imageUrls = [];
        $failedUploads = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                try {

                    $uploadedImage = Cloudinary::upload($image->getRealPath(), [
                        'folder' => 'project_images',
                        'timeout' => 30,
                    ]);
                    $imageUrls[] = $uploadedImage->getSecurePath();
                } catch (\Exception $e) {
                    Log::error('Image upload failed: ' . $e->getMessage());
                    $failedUploads[] = $image->getClientOriginalName();
                }
            }
        }
    
        if (count($imageUrls) === 0 && $request->hasFile('images')) {
            return redirect()->back()->withErrors([
                'images' => 'All image uploads failed. Please try again.'
            ])->withInput();
        }
    
        try {
            // Attempt to create the document
            Document::create([
                'user_id' => Auth::id(),
                'title' => $validatedData['title'],
                'summary' => $validatedData['summary'],
                'description' => $validatedData['description'],
                'organization' => $validatedData['organization'],
                'year' => $validatedData['year'],
                'video_url' => $validatedData['video_url'],
                'file_path' => $validatedData['file_path'],
                'status' => $validatedData['status'],
                'image_urls' => implode(',', $imageUrls), 
                'category_ids' => implode(',', $validatedData['categories']),
            ]);
    
            // Check for any partially failed uploads
            $message = 'Project added successfully.';
            if (count($failedUploads) > 0) {
                $message .= ' However, the following images failed to upload: ' . implode(', ', $failedUploads) . '.';
            }
    
            return redirect()->route('admin.document.view')->with('success', $message);
    
        } catch (\Exception $e) {
            // Catch and log any errors during the database operation
            Log::error('Project creation failed: ' . $e->getMessage());
    
            return redirect()->back()->withErrors([
                'general' => 'An error occurred while saving the document. Please try again.'
            ])->withInput();
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
     * Return specific document resource for update
     *
     * @param string $id
     * @return void
     */
    public function edit(string $id)
    {
        //
        $page_title = "Admin Panel Edit Document";
        $document = Document::findOrFail($id);
        return view('documents.edit', compact('page_title', 'document'));
    }

    /**
     * Update specific resource
     *
     * @param UpdateDocumentRequest $request
     * @param string $id
     * @return void
     */
    public function update(UpdateDocumentRequest $request, string $id)
    {
        //
        $document = Document::findOrFail($id);
        $document->update($request->validated());

        return redirect()->route('admin.document.view')->with('success', 'Document updated successfully.');
    }

    /**
     * Deletes specific document
     *
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        //
        $subscriber = Document::findOrFail($id);
        $subscriber->delete();
        return redirect()->route('admin.document.view')->with('success', 'Document deleted successfully!');
    }

    /**
     * Returns all documents to be consumed by frontend
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDocuments()
    {
        try {
            $documents = Document::where('status', 'active')->get(); // Fetch all documents where status is 'active'

            // Check if documents exist
            if ($documents->isEmpty()) {
                return response()->json([
                    'message' => 'No active documents found.',
                ], 404); // Return 404 with a user-friendly message
            }

            return DocumentResource::collection($documents); // Use resource collection
        } catch (\Exception $e) {
            // Handle any exceptions that occur
            return response()->json([
                'message' => 'An error occurred while fetching documents. Please try again later.',
                'error' => $e->getMessage(), // Optional: include error message for debugging (remove in production)
            ], 500); // Return 500 Internal Server Error
        }
    }

    /**
     * Returns specific resource to be consumed by frontend
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSingleDocument(string $id)
    {
        try {
            // Fetch a specific document where status is 'active'
            $document = Document::where('id', $id)->where('status', 'active')->firstOrFail();

            return new DocumentResource($document); // Use single resource
        } catch (\Exception $e) {
            // Handle the case where the document is not found or is not active
            return response()->json([
                'message' => 'Document not found or is not active.',
            ], 404); // Return 404 with a user-friendly message
        } catch (\Exception $e) {
            // Handle any other exceptions that occur
            return response()->json([
                'message' => 'Server error.',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }
}
