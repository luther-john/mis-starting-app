<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employees extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'hire_date',
        'gender',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'position',
        'department',
    ];
}
