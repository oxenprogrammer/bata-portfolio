<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MentorshipModel;
use Illuminate\Database\QueryException;
use App\Http\Requests\MentorshipRequest;

class MentorshipController extends Controller
{
    //
    /**
     * Get all Mentorship queries
     *
     * @return void
     */
    public function index()
    {
        $page_title = 'Admin Panel Mentorship';
        $mentorship = MentorshipModel::all();
        return view('mentorship.index',compact('page_title','mentorship'));
    }

    /**
     * Store resource
     *
     * @param MentorshipRequest $request
     * @return void
     */
    public function store(MentorshipRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $mentorship = MentorshipModel::create($validatedData);
            return response()->json([
                'message' => 'Info saved!',
            ], 201);
        } catch (QueryException $e) {
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
     * Destroy resource
     *
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        //
        $mentorship = MentorshipModel::findOrFail($id);
        $mentorship->delete();
        return redirect()->route('admin.mentorship.view')->with('success', 'Info deleted!');
    }


}
