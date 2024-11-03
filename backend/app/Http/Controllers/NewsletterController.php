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

use App\Models\Newsletter;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\NewsletterStoreRequest;

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

    public function index()
    {
        $page_title = 'Admin Panel View Newsletters';
        $newsletters = Newsletter::all();
        return view('newsletters.index', compact('page_title', 'newsletters'));
    }
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

    /**
     * Store news letter resource
     *
     * @param NewsletterStoreRequest $request
     * @return void
     */
    public function store(NewsletterStoreRequest $request)
    {
        try {
            $validateData = $request->validated();
            $attachments = $request->input('attachments', []);
            $content = Str::sanitize($validateData['content']);

            $newsletter = Newsletter::create([
                'subject' => $validateData['subject'],
                'content' => $content,
                'attachments' => json_encode($attachments),
                'scheduled_at' => $validateData['scheduled_at'],
            ]);

            return redirect()->route('admin.newsletter.view')->with('success', 'Newsletter created.');

        } catch (\Exception $e) {
            Log::error('Failed to save newsletter: ' . $e->getMessage(), [
                'error' => $e->getMessage(),
                'data' => $request->except(['attachments']),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', 'Failed to create newsletter.');
        }
    }

    /**
     * Return specific newsletter resource for update
     *
     * @param string $id
     * @return void
     */
    public function edit(string $id)
    {
        //
        $page_title = "Admin Panel Edit Newsletter";
        $newsletter = Newsletter::findOrFail($id);
        return view('newsletters.edit', compact('page_title', 'newsletter'));
    }

    /**
     * Destroys specific news letter resource
     *
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        //
        $newsletter = Newsletter::findOrFail($id);
        $newsletter->delete();
        return redirect()->route('admin.newsletter.view')->with('success', 'Newsletter deleted successfully!');
    }
}
