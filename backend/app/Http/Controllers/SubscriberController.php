<?php

/**
 * This File contains Subscriber Controller and its methods
 * to handle subscriptions
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

use App\Models\Subscriber;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\QueryException;
use App\Http\Requests\SubscriberRequest;
use App\Mail\SubscriptionConfirmationMail;
use App\Http\Requests\UpdateSubscriberRequest;
use Illuminate\Validation\ValidationException;

/**
 * This File Class handles subscribers
 *
 * PHP version 8
 *
 * @category  Controllers
 * @package    App\Http\Controllers
 * @author     Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link       https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */
class SubscriberController extends Controller
{
    /**
     * Return all subscribers
     *
     * @return void
     */
    public function index()
    {
        //
        $page_title = "Admin Panel Subscribers";
        $subscribers = Subscriber::all();
        return view('subscribers.index', compact('page_title', 'subscribers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubscriberRequest $request)
    {
        

        try {
            // Validate the incoming request
            $validatedData = $request->validated();
            return response()->json($validatedData);
            $validatedData['ip_address'] = $request->ip();
            $validatedData['token'] = Str::random(32);
            $subscriber = Subscriber::create($validatedData);
            // Send confirmation email
            Mail::to($subscriber->email)->send(new SubscriptionConfirmationMail($subscriber->token, $subscriber->email));
            return response()->json([
                'message' => 'Subscriber created successfully.',
            ], 201);
            
        }catch (QueryException $e) {
            return response()->json([
                'message' => 'Database error occurred while creating the subscriber.',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Confirms subscription 
     *
     * @param string $token
     * @return void
     */
    public function confirmSubscription(string $token)
    {
        // Find the subscriber by the token
        $subscriber = Subscriber::where('token', $token)->first();

        if (!$subscriber) {
            $status = false;
        } else {
            // Update the subscriber's status to 'active' and clear the token
            $subscriber->update([
                'status' => 'active',
                'token' => null,
            ]);
            $status = true;
        }

        return view('subscribers.confirmation', compact('status'));
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
        $subscriber = Subscriber::findOrFail($id);
        $view = view('subscribers.edit', compact('subscriber'))->render();
        return response()->json(['html' => $view], 200);
    }
    /**
     * Store updated resource
     *
     * @param UpdateSubscriberRequest $request
     * @param string $id
     * @return void
     */
    public function update(UpdateSubscriberRequest $request, string $id)
    {
        //
        $subscriber = Subscriber::findOrFail($id);
        $subscriber->update($request->validated());
        return response()->json(['message' => 'Subscriber updated successfully'], 201);
    }

    /**
     * Delete specified subscriber resource
     *
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        //
        $subscriber = Subscriber::findOrFail($id);
        $subscriber->delete();
        return redirect()->route('admin.subscriber.view')->with('success', 'Subscriber deleted successfully!');
    }
}
