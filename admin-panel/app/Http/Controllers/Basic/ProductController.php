<?php

namespace App\Http\Controllers\Basic;

use App\Http\Controllers\Controller;
use App\Product;
use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // foreach (range(0, 6) as $number) {
        //     $rand = random_int(0, 100);
        //     $image = "https://picsum.photos/id/$rand/200/300";
        //     $name = "Category $number";
        //     $title = random_int(0, 3) == 0 ? "" : "Title $number";
        //     $subtitle = random_int(0, 3) == 0 ? "" : "Subtitle $number";
        //     $cols = random_int(0, 4);
        //     $select_count = random_int(-1, 4);
        //     Category::create(compact('image', 'name', 'title', 'subtitle', 'cols', 'select_count'));
        // }
        $categories = Category::orderby('order')->get();
        $selectedCategory;
        if(key_exists('id', $_GET) && $_GET['id'] > 0) {
            $selectedCategory = Category::find($_GET['id']);
        } else if($categories != null && count($categories) > 0){
            $selectedCategory = $categories[0];
        }
        // foreach ($categories as $key => $category) {
        //     $range = random_int(5, 10);
        //     foreach (range(0, $range) as $number) {
        //         $rand = random_int(0, 100);
        //         $image = "https://picsum.photos/id/$rand/200/300";
        //         $categoryid = $category->id;
        //         $parentid = 0;
        //         $categoryname = $category->name;
        //         $name = "Product $number of $categoryname";
        //         $cols = random_int(0, 4);
        //         $price = random_int(100, 1000)/100;
        //         Product::create(compact('image', 'categoryid', 'parentid', 'name', 'cols', 'price'));
        //     }
        // }
        return view('product.index', compact('categories', 'selectedCategory'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->hasFile('prod_image')) {
            $extension = $request->file('prod_image')->getClientOriginalExtension();
            $fileNameToStore = time().'.'.$extension;
             $url = Storage::url($request->file('prod_image')->storeAs('public',$fileNameToStore));
            $request->merge(['image' => $url]);
        }
        if($request->type =="category") {
            if($request->edit_id) {
                Category::where('id', $request->edit_id)->update($request->only('image', 'name', 'title', 'subtitle', 'cols', 'select_count', 'order'));
            } else {
                Category::create($request->all());
            }
        } else if($request->type =="product") {
            if($request->edit_id) {
                Product::where('id', $request->edit_id)->update($request->only('image', 'categoryid', 'parentid', 'name', 'cols', 'price', 'order'));
            } else {
                Product::create($request->all());
            }
        }
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        foreach ($request->orders as $key => $value) { 
            if($request->type == 'category') {
                Category::find($value['id'])->update(['order' => $value['index']]);
            } else {
                Product::find($value['id'])->update(['order' => $value['index']]);
            }
        }
        return 1;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $ids = $request->ids;
        $isCategory = $request->type == 'category';
        if($isCategory) {
            $prod_files = Product::whereIn('categoryid', $ids)->pluck('image')->toArray();
            $cat_files = Category::whereIn('id', $ids)->pluck('image')->toArray();
            $files = array_merge($prod_files, $cat_files);
            Product::whereIn('categoryid', $ids)->delete();
            Category::whereIn('id', $ids)->delete();
        } else {
            $files = Product::whereIn('id', $ids)->pluck('image')->toArray();
            Product::whereIn('id', $ids)->delete();
        }
        foreach ($files as $key => $file) {
            if($file == null || str_contains($file, "http://") ||  str_contains($file, "https://")) {
                continue;
            }
            File::delete(public_path($file));
        }
        return 1;
    }
}
