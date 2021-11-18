@extends('layouts.app', ['activePage' => 'product', 'titlePage' => __('Products Management')])

@section('content')
<div class="content">
  <div class="container-fluid">
    <div class="card ">
      <div class="card-header card-header-primary">
        <h4 class="card-title">{{ __('Product management') }}</h4>
        {{-- <p class="card-category">{{ __('User information') }}</p> --}}
      </div>
      <div class="card-body row">
        <div class="{{$selectedCategory == null ? 'col-md-12' : 'col-md-4'}}">
          <button class="btn btn-danger btn-sm" style="float: right" disabled id="btnCatDelete">Delete</button>
          <button class="btn btn-success btn-sm" style="float: right" id="btnCatSave">Save</button>
          <button class="btn btn-primary btn-sm" style="float: right" id="btnCatAdd">Add</button>
          <table class="table table-striped table-no-bordered table-hover" style='padding:5px'>
            <thead class=" text-primary">
              <tr>
                <th style="width: 20px"></th>
                <th colspan="2"></th>
                <th style="width: 20px"></th>
                <th style="width: 20px"></th>
              </tr>
            </thead>
            <tbody id="categories">
              @foreach($categories as $key => $value)
              <tr class="{{$value->id == $selectedCategory->id ? 'selected-item' : ''}}" id="category_{{$key}}" value="{{$value->id}}">
                <td>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input class="form-check-input chk_cat_delete" type="checkbox" value="{{$value->id}}">
                      <span class="form-check-sign">
                        <span class="check"></span>
                      </span>
                    </label>
                  </div>
                </td>
                <td><img src="{{$value->image}}" alt="" srcset="" style="width: 40px; height:40px"></td>
                <td>{{$value->name}}</td>
                <td>
                  <button rel="tooltip" class="btn btn-success btn-sm btn-link m-0 p-0" href="#" data-original-title="View" title="View"
                    onclick="location.href='?id={{$value->id}}'">
                    <i class="material-icons">preview</i>
                  </button>
                </td>
                <td>
                  <a rel="tooltip" class="btn btn-success btn-sm btn-link m-0 p-0 btn_edit_cat" value="{{$value}}" data-original-title="Edit" title="Edit">
                    <i class="material-icons">edit</i>
                  </a>
                </td>
              </tr>
              @endforeach
            </tbody>
          </table>
        </div>
        @if ($selectedCategory != null)
        @php
        $cols = $selectedCategory->cols;
        if($cols <= 0) $cols=4;
        @endphp 
        <div class="col-md-8 ">
            <h3 style="text-align: center">{{$selectedCategory->title}}</h3>
            <h4 style="text-align: center">{{$selectedCategory->subtitle}}</h4>
            <div style="text-align: right;">
              <div>
                <span style="margin-right: 30px">Select Count: {{$selectedCategory->select_count}}</span>
                <span>Number of cols: {{$cols}}</span>
              </div>
              <button class="btn btn-primary btn-sm" style="" id="btnProdAdd">Add</button>
              <button class="btn btn-success btn-sm" style="" id="btnProdSave">Save</button>
              <button class="btn btn-danger btn-sm" style="" disabled id="btnProdDelete">Delete</button>
            </div>
          <div class=" row" id="products">
            @foreach ($selectedCategory->Products as $key => $value)
            <div style="float: left; width:{{100 / $cols}}%; padding:12px" class="product-item" value="{{$value->id}}">
              <img src="{{$value->image}}" alt="" srcset="" style="width: 100%; max-height:130px; object-fit:contain">
              <p style="text-align: center; margin-top:10px">{{$value->name}}</p>
            </div>
            @endforeach
          </div>
      </div>
      @endif
    </div>
  </div>
</div>
</div>


<div class="modal fade" id="modal_add_category" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form method="post" action="{{route('product.store')}}" autocomplete="off" class="modal-content" enctype="multipart/form-data">
      @csrf
      <input type="hidden" name="type" value="category">
      <input type="hidden" name="edit_id" id="cat_id" value="">
      <div class="modal-header">
        <h5 class="modal-title">Add Category</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body row">
       <div class="col-md-4" style="overflow: hidden">
          <img class="preview" src="https://picsum.photos/id/58/200/300" alt="preview" srcset="" style="width: 100%; max-height:300px; object-fit:contain">
          <label class="btn btn-sm btn-success select_image" style="width:100%" for="cat_image">Select</label>
          <label class="btn btn-sm btn-danger delete_image" style="width:100%">Delete</label>
          <input type="file" name="prod_image" id="cat_image" class="image_selector hidden" value="category" accept="image/*">
       </div>
       <div class="col-md-8">
          <input class="form-control" id="cat_name" name="name" type="text"  placeholder="{{ __('Name') }}" required/>
          <input class="form-control" id="cat_title" name="title" type="text"  placeholder="{{ __('Title') }}" required/>
          <input class="form-control" id="cat_subtitle" name="subtitle" type="text"  placeholder="{{ __('Sub title') }}" required/>
          <input class="form-control" id="cat_cols" name="cols" type="number" min="1" max="10"  placeholder="{{ __('Cols') }}" required/>
          <input class="form-control" id="cat_select_count" name="select_count" type="number" min="-1"  placeholder="{{ __('Select Count') }}" required/>
          <input class="form-control" id="cat_order" name="order" type="number" min="0"   placeholder="{{ __('Order') }}" required/>
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</div>


<div class="modal fade" id="modal_add_product" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form method="post" action="{{route('product.store')}}" autocomplete="off" class="modal-content" enctype="multipart/form-data">
      @csrf
      <input type="hidden" name="type" value="product">
      <input type="hidden" name="prod_id" value="">
      <div class="modal-header">
        <h5 class="modal-title">Add Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body row">
       <div class="col-md-4" style="overflow: hidden">
          <img class="preview" src="https://picsum.photos/id/58/200/300" alt="preview" srcset="" style="width: 100%; max-height:300px; object-fit:contain">
          <label class="btn btn-sm btn-success select_image" style="width:100%" for="prod_image">Select</label>
          <label class="btn btn-sm btn-danger delete_image" style="width:100%">Delete</label>
          <input type="file" name="prod_image" id="prod_image" class="image_selector hidden" value="category" accept="image/*">
       </div>
       <div class="col-md-8">
          <input class="form-control" id="prod_name" name="name" type="text"  placeholder="{{ __('Name') }}" required/>
          <select class="form-control " name="categoryid" id="prod_categoryid"  data-style="btn btn-primary" value='{{$selectedCategory->id}}' required>
            @foreach ($categories as $item)
              <option value="{{$item->id}}" {{$selectedCategory->id == $item->id ? 'selected' : ''}}>{{$item->name}}</option>
            @endforeach
          </select>
          <input class="form-control" id="prod_parentid" name="parentid" type="hidden" value="0" placeholder="{{ __('Parent Item') }}"/>
          <input class="form-control" id="prod_cols" name="cols" type="number" min="1" max="10"  placeholder="{{ __('Cols') }}" required/>
          <input class="form-control"id="prod_price" name="price" type="number" min="0" step=".01"  placeholder="{{ __('Price') }}"required>
          <input class="form-control" id="prod_order" name="order" type="number" min="0"   placeholder="{{ __('Order') }}" required/>
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</div>


@endsection
@push('js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
<script>
  let url_delete = '{{route('product.destroy', 0)}}';
      let url_update = '{{route('product.update', 0)}}';
</script>
<script src="{{ asset('material') }}/js/pages/product.js"></script>
@endpush