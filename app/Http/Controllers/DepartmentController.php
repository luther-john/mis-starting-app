<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use PhpParser\Node\Stmt\TryCatch;
class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Departments::all();
        return inertia::render('Departments/Index', compact('departments')); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia::render('Departments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            ]);

            $department = Departments::create($validated);

            if ($department) {
                return redirect()->route('departments.index')->with('success', 'Department created successfully.');
            } else {
                return redirect()->back()->with('error', 'Failed to create department. Please try again.');
            }
        } catch(\Exception $e) {
            Log::error('Error creating department: ' . $e->getMessage());
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Departments $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departments $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departments $department)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departments $department)
    {
        //
    }
}
