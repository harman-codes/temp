<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('users/index');
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email|min:2|unique:users,email',
            'password' => 'required|string|min:4',
        ]);

        $user = User::create($validated);

        return response()->json([
            'users' => User::orderBy('created_at', 'desc')->get(['id', 'name', 'email']),
        ]);
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
        // abort(401, 'Unauth Access');
        // return response()->json([
        //     'message' => 'Oops... something went wrong',
        // ], 401);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|min:2|unique:users,email,'.$id,
            'password' => 'nullable|string|min:4',
        ]);

        $user = User::where('id', $id)->first();
        $isSuccessful = $user->update($validated);

        if (! $isSuccessful) {
            return response()->json([
                'message' => 'Invalid User',
            ], 400);
        }

        return response()->json([
            'message' => 'Just updated',
            'user' => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // throw new \Exception('A valid user ID is required.');
        $isSuccessful = User::destroy($id);

        if (! $isSuccessful) {
            //            return response()->json([
            //                'users' => User::orderBy('created_at', 'desc')->get(['id', 'name', 'email']),
            //            ]);
            //        } else {
            return response()->json([
                'message' => 'Invalid User',
            ], 400);
        } else {
            return response()->json([]);
        }
    }

    public function getUsers()
    {
        return response()->json([
            'users' => User::orderBy('created_at', 'desc')->get(['id', 'name', 'email']),
            'departments' => Department::all(['id', 'name', 'code']),
        ]);
    }

    public function deleteDepartment(string $id)
    {
        $isSuccessful = Department::destroy($id);

        if ($isSuccessful) {
            return response()->json([
                'departments' => Department::all(['id', 'name', 'code']),
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid Department',
            ], 400);
        }
    }
}
