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
use Illuminate\Http\Request;
use App\Http\Requests\SubscriberRequest;

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
        
        $validatedData = $request->validated();
        // Add the subscriber's IP address to the validated data
        $validatedData['ip_address'] = $request->ip();

        $subscriber = Subscriber::create($validatedData); // Create a new subscriber

        return response()->json([
            'message' => 'Subscriber created successfully.',
            'subscriber' => $subscriber,
        ], 201);
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
