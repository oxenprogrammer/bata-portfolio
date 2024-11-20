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
use App\Models\Subscriber;
use Illuminate\Support\Str;
use App\Mail\NewsletterMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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
     * Update newsletter resource.
     *
     * @param NewsletterStoreRequest $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(NewsletterStoreRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            // Retrieve the newsletter or fail
            $newsletter = Newsletter::findOrFail($id);

            // Retrieve existing attachments directly as an array
            $existingAttachments = $newsletter->attachments ?? [];
            $newAttachments = $request->input('attachments', []);

            // Merge the attachments, ensuring unique entries
            // $mergedAttachments = array_unique(array_merge($existingAttachments, $newAttachments));

            // Sanitize the content
            $content = Str::sanitize($validatedData['content']);

            // Update the newsletter with the validated data
            $newsletter->update([
                'subject' => $validatedData['subject'],
                'content' => $content,
                'is_sent'=>false,
                // 'attachments' => $mergedAttachments,
                'scheduled_at' => $validatedData['scheduled_at'],
            ]);

            return redirect()->route('admin.newsletter.view')->with('success', 'Newsletter updated successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to update newsletter: ' . $e->getMessage(), [
                'error' => $e->getMessage(),
                'data' => $request->except(['attachments']),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', 'Failed to update newsletter.');
        }
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

    public function send($id)
    {
        try {

            $newsletter = Newsletter::findOrFail($id);
            $subscribers = Subscriber::where('status','active')->get();
            if($subscribers->isNotEmpty())
            {
                foreach ($subscribers as $subscriber) {
                    // Log::info('Attachments:', $newsletter->attachments); 
                    Mail::to($subscriber->email)->send(new NewsletterMail(
                        $newsletter->subject,
                        $newsletter->content,
                        $newsletter->attachments,
                    ));
                }
                $newsletter->update(['is_sent' => true]);
            }else{
                return redirect()->route('admin.newsletter.view')->with('success', 'No active subscribers!');
            }
            
            return redirect()->route('admin.newsletter.view')->with('success', 'Newsletter sent successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to send newsletter: ' . $e->getMessage(), [
                'newsletter_subject' => $newsletter->subject,
                'attachments' => $newsletter->attachments,
                'error_trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', 'Failed to send newsletter.');
        }
    }
}
