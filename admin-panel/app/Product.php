<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['image', 'categoryid', 'parentid', 'name', 'cols', 'price', 'order'];
    //
    /**
     * Get the Category associated with the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function Category()
    {
        return $this->hasOne(Category::class, 'id', 'categoryid');
    }
}
