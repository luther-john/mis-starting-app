<?php

namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;
use Inertia\Inertia;


class EmployeeController extends Controller
{
    public function index()
    {
        $employee = Employees::all();
        return inertia::render('Employees/Index', compact('employee'));
    }

    public function create() {
        return inertia::render('Employees/Create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'nullable|string|max:20',
            'hire_date' => 'required|date',
            'gender' => 'nullable|string|max:10',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'position' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
        ]);

        Employees::create($validated);
        return redirect()->route('employee.index')->with('success', 'Employee created successfully.');
    }
}
