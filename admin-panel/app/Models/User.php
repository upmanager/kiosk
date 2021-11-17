<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'surname', 'nickname', 'password', 'avatar' ,'email', 'role', 'active', 'sex', 'age', 'phonenumber', 'position_id', 'motto', 'groupid', 'group1id', 'group2id', 'group3id', 'group4id', 'device_token', 'iphone_device_token', 'customer_id', 'terms', 'nutrition', 'live_video', 'fitness', 'tactic', 'nutrition_manager', 'fitness_manager', 'tactic_manager'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function accessTokens()
    {
        return $this->hasMany('App\OauthAccessToken');
    }
    public function group()
    {
        return $this->hasOne('App\Group', 'id', 'groupid');
    }
    public function group1()
    {
        return $this->hasOne('App\Group', 'id', 'group1id');
    }
    public function group2()
    {
        return $this->hasOne('App\Group', 'id', 'group2id');
    }
    public function group3()
    {
        return $this->hasOne('App\Group', 'id', 'group3id');
    }
    public function group4()
    {
        return $this->hasOne('App\Group', 'id', 'group4id');
    }
    public function blogs()
    {
        return $this->hasMany('App\News', 'userid', 'id');
    }
    public function position(){
        return $this->hasOne('App\Positions', 'id', 'position_id');
    }
    public function payment(){
        return $this->hasOne('App\Transaction', 'userid', 'id')->latest();
    }
    public function userRole(){
        return $this->hasOne('App\Role', 'id', 'role');
    }
    public function adminRole(){
        return $this->hasMany('App\AdminRole', 'userid');
    }
    public function stories(){
        return $this->hasMany('App\Stories', 'userid');
    }
}
