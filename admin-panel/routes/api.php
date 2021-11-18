<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// access without login
// Route::post('register', 'API\UserController@register');
// Route::post('login', 'API\UserController@login');
Route::get('categories', 'API\BaseController@index');

// Route::group(['middleware' => 'auth:api'], function () {
   
// });
