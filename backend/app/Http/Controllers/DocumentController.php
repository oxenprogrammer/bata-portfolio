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
    * Delete specific document resource
    *
    * @param string $id
    * @return void
    */
    public function destroy(string $id)
    {
        $document = Document::findOrFail($id);
        $document->delete();
    
        return redirect()->route('admin.document.view')->with('success', 'Document deleted successfully.');
    }

    /**
     * Returns all documents to be consumed by frontend
     *
     * @return void
     */
    public function getAllDocuments()
    {
        $documents = Document::all(); // Fetch all documents
        return DocumentResource::collection($documents); // Use resource collection
    }

    /**
     * Returns specific resource to be consumed by frontend
     *
     * @param string $id
     * @return void
     */
    public function getSingleDocument(string $id)
    {
        $document = Document::findOrFail($id); // Fetch a specific document
     return new DocumentResource($document); // Use single resource
    }

}
