<?php

/**
 * This File contains Users Controller and its methods
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

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Log;

use function PHPSTORM_META\map;

/**
 * This is  Users Controller class 
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

class UserController extends Controller
{
    /**
     * Return all users
     *
     * @return void
     */
    public function index()
    {
        //
        $page_title = 'Admin Panel View Users';
        $users = User::all()->map(function ($user) {
            $user->skills = $user->skills ? json_decode($user->skills) : [];
            return $user;
        });
        return view('users.index', compact('users', 'page_title'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $page_title = "Admin Panel Create User";
        return view('users.create', compact('page_title'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        //
        try {
            $validatedData = $request->validated();

            $user = User::create([
                'name' => $validatedData['name'] ?? null, 
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'email' => $validatedData['email'],
                'biography' => $validatedData['biography'],
                'skills' => $validatedData['skills'],
                'password' => bcrypt($validatedData['password']),
                'is_admin' => $validatedData['is_admin'] ?? false,
            ]);

            return redirect()->route('admin.user.view')->with('success', 'User created successfully.');

        } catch (Exception $e) {
            Log::error('Error while creating user: ' . $e->getMessage());

            return redirect()->back()->withErrors(['error' => 'An error occurred while creating the user.']);
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
        $page_title = "Admin Panel Edit User";
        $user = User::findOrFail($id);
        return view('users.edit', compact('page_title', 'user'));
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
