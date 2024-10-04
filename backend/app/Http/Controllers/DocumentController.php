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
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\DocumentResource;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;

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
        $page_title = "Admin Panel Create Document";
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
        //// The request is valid, proceed with storing the document
        $validatedData = $request->validated();

        // Create the document with validated data
        Document::create([
            'user_id' => Auth::id(),
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'file_size' => $validatedData['file_size'],
            'file_path' => $validatedData['file_path'],
            'file_type' => $validatedData['file_type'],
            'status' => $validatedData['status'],
        ]);

        return redirect()->route('admin.document.view')->with('success', 'Document added successfully.');
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
