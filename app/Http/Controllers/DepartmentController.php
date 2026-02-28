<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255',
        ]);

        $department = Department::create($validated);

        if ($department) {
            return response()->json([
                'message' => 'Department created',
                'department' => $department,
            ]);
        }

        return response()->json([
            'message' => 'Department not created',
        ], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255',
        ]);

        $isSuccessful = Department::where('id', $id)->update($validated);

        if ($isSuccessful) {
            return response()->json([
                'message' => 'Department updated',
                'department' => Department::whereId($id)->first(),
            ]);
        }

        return response()->json([
            'message' => 'Department not updated',
        ], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        //
    }
}
