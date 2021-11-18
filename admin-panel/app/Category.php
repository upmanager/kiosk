<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * Get all of the Products for the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    protected $fillable = ['image', 'name', 'title', 'subtitle', 'cols', 'select_count', 'order'];
    public function Products()
    {
        return $this->hasMany(Product::class, 'categoryid')->orderby('order');
    }
}
