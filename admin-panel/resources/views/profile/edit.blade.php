@extends('layouts.app', ['activePage' => 'profile', 'titlePage' => __('User Profile')])

@section('content')
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <form method="post" action="{{ route('profile.update') }}" autocomplete="off" class="form-horizontal" enctype="multipart/form-data">
            @csrf
            @method('put')

            <div class="card ">
              <div class="card-header card-header-primary">
                <h4 class="card-title">{{ __('Edit Profile') }}</h4>
                <p class="card-category">{{ __('User information') }}</p>
              </div>
              <div class="card-body ">
                @if (session('status'))
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="alert alert-success">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <i class="material-icons">close</i>
                        </button>
                        <span>{{ session('status') }}</span>
                      </div>
                    </div>
                  </div>
                @endif
                <div class="row">
                  <div class="col-md-4 row" style="justify-content: center; align-content: center;">
                    <div class="fileinput text-center fileinput-new" data-provides="fileinput">
                      <div class="fileinput-new thumbnail img-circle">
                        @if(auth()->user()->avatar != null)
                        <img src="{{auth()->user()->avatar}}" alt="...">
                        @else
                          <img src="{{ asset('material') }}/img/default.png" alt="...">
                        @endif
                      </div>
                      <div class="fileinput-preview fileinput-exists thumbnail img-circle" style=""></div>
                      <div>
                        <span class="btn btn-round btn-rose btn-file">
                          <span class="fileinput-new"> Photo</span>
                          <span class="fileinput-exists">Change</span>
                          <input type="file" name="photo_path">
                        <div class="ripple-container"></div></span>
                        <br>
                        <a href="#pablo" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> Remove<div class="ripple-container"><div class="ripple-decorator ripple-on ripple-out" style="left: 80.0156px; top: 18px; background-color: rgb(255, 255, 255); transform: scale(15.5098);"></div><div class="ripple-decorator ripple-on ripple-out" style="left: 80.0156px; top: 18px; background-color: rgb(255, 255, 255); transform: scale(15.5098);"></div><div class="ripple-decorator ripple-on ripple-out" style="left: 80.0156px; top: 18px; background-color: rgb(255, 255, 255); transform: scale(15.5098);"></div></div></a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8 row">
                    <label class="col-md-2 col-form-label">{{ __('Name') }}</label>
                    <div class="col-md-4">
                      <div class="form-group{{ $errors->has('name') ? ' has-danger' : '' }}">
                        <input class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" id="input-name" type="text" placeholder="{{ __('Name') }}" value="{{ old('name', auth()->user()->name) }}" required="true" aria-required="true"/>
                        @if ($errors->has('name'))
                          <span id="name-error" class="error text-danger" for="input-name">{{ $errors->first('name') }}</span>
                        @endif
                      </div>
                    </div>
                    <label class="col-md-2 col-form-label">{{ __('SurName') }}</label>
                    <div class="col-md-4">
                      <div class="form-group{{ $errors->has('surname') ? ' has-danger' : '' }}">
                        <input class="form-control{{ $errors->has('surname') ? ' is-invalid' : '' }}" name="surname" id="input-surname" type="text" placeholder="{{ __('SurName') }}" value="{{ old('surname', auth()->user()->surname) }}" required="true" aria-required="true"/>
                        @if ($errors->has('surname'))
                          <span id="name-error" class="error text-danger" for="input-surname">{{ $errors->first('lastName') }}</span>
                        @endif
                      </div>
                    </div>
                    <label class="col-md-2 col-form-label">{{ __('Nick name') }}</label>
                    <div class="col-md-4">
                      <div class="form-group{{ $errors->has('nickname') ? ' has-danger' : '' }}">
                        <input class="form-control{{ $errors->has('nickname') ? ' is-invalid' : '' }}" name="nickname" id="input-nickname" type="text" placeholder="{{ __('Nick name') }}" value="{{ old('nickname', auth()->user()->nickname) }}" required="true" aria-required="true"/>
                        @if ($errors->has('nickname'))
                          <span id="name-error" class="error text-danger" for="input-nickname">{{ $errors->first('lastName') }}</span>
                        @endif
                      </div>
                    </div>
                    <label class="col-sm-2 col-form-label">{{ __('Email') }}</label>
                    <div class="col-sm-4">
                      <div class="form-group{{ $errors->has('email') ? ' has-danger' : '' }}">
                        <input class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" id="input-email" type="email" placeholder="{{ __('Email') }}" value="{{ old('email', auth()->user()->email) }}" required />
                        @if ($errors->has('email'))
                          <span id="email-error" class="error text-danger" for="input-email">{{ $errors->first('email') }}</span>
                        @endif
                      </div>
                    </div>
                    <label class="col-sm-2 col-form-label">{{ __('Phone number') }}</label>
                    <div class="col-sm-4">
                      <div class="form-group{{ $errors->has('phonenumber') ? ' has-danger' : '' }}">
                        <input class="form-control{{ $errors->has('phonenumber') ? ' is-invalid' : '' }}" name="phonenumber" id="input-phonenumber" type="phonenumber" placeholder="{{ __('Phone number') }}" value="{{ old('phonenumber', auth()->user()->phonenumber) }}" required />
                        @if ($errors->has('phonenumber'))
                          <span id="phonenumber-error" class="error text-danger" for="input-phonenumber">{{ $errors->first('phonenumber') }}</span>
                        @endif
                      </div>
                    </div>
                    <label class="col-sm-2 col-form-label">{{ __('Age') }}</label>
                    <div class="col-sm-4">
                      <div class="form-group{{ $errors->has('age') ? ' has-danger' : '' }}">
                        <input class="form-control{{ $errors->has('age') ? ' is-invalid' : '' }}" name="age" id="input-age" type="number" placeholder="{{ __('Age') }}" value="{{ old('age', auth()->user()->age) }}" required />
                        @if ($errors->has('age'))
                          <span id="age-error" class="error text-danger" for="input-age">{{ $errors->first('age') }}</span>
                        @endif
                      </div>
                    </div>
                    <label class="col-sm-2 col-form-label" for="input-password-confirmation">{{ __('Gender') }}</label>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <select class="selectpicker" name="sex" data-style="btn btn-primary" value="0">
                          <option value="0" <?php echo (auth()->user()->sex == 0 ? 'selected' : '')?>>Male</option>
                          <option value="1" <?php echo (auth()->user()->sex == 1 ? 'selected' : '')?>>Female</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6"></div>
                    <!-- <label class="col-sm-2 col-form-label" for="input-password-confirmation">{{ __('Group') }}</label>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <select class="selectpicker" name="groupid" data-style="btn btn-primary" value="0">
                          @foreach($groups as $group)
                            <option value="{{$group->id}}" <?php echo (auth()->user()->groupid == $group->id ? 'selected' : '')?>>{{$group->name}}</option>
                          @endforeach
                        </select>
                      </div>
                    </div> -->
                    <label class="col-sm-2 col-form-label">{{ __('Motto') }}</label>
                    <div class="col-sm-10">
                      <div class="form-group{{ $errors->has('motto') ? ' has-danger' : '' }}">
                        <input class="form-control{{ $errors->has('motto') ? ' is-invalid' : '' }}" name="motto" id="input-motto" type="text" placeholder="{{ __('Motto') }}" value="{{ old('motto', auth()->user()->motto) }}" required />
                        @if ($errors->has('motto'))
                          <span id="motto-error" class="error text-danger" for="input-motto">{{ $errors->first('motto') }}</span>
                        @endif
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer ml-auto mr-auto">
                <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <form method="post" action="{{ route('profile.password') }}" class="form-horizontal">
            @csrf
            @method('put')

            <div class="card ">
              <div class="card-header card-header-primary">
                <h4 class="card-title">{{ __('Change password') }}</h4>
                <p class="card-category">{{ __('Password') }}</p>
              </div>
              <div class="card-body ">
                @if (session('status_password'))
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="alert alert-success">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <i class="material-icons">close</i>
                        </button>
                        <span>{{ session('status_password') }}</span>
                      </div>
                    </div>
                  </div>
                @endif
                <div class="row">
                  <label class="col-sm-2 col-form-label" for="input-current-password">{{ __('Current Password') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('old_password') ? ' has-danger' : '' }}">
                      <input class="form-control{{ $errors->has('old_password') ? ' is-invalid' : '' }}" input type="password" name="old_password" id="input-current-password" placeholder="{{ __('Current Password') }}" value="" required />
                      @if ($errors->has('old_password'))
                        <span id="name-error" class="error text-danger" for="input-name">{{ $errors->first('old_password') }}</span>
                      @endif
                    </div>
                  </div>
                </div>
                <div class="row">
                  <label class="col-sm-2 col-form-label" for="input-password">{{ __('New Password') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('password') ? ' has-danger' : '' }}">
                      <input class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" id="input-password" type="password" placeholder="{{ __('New Password') }}" value="" required />
                      @if ($errors->has('password'))
                        <span id="password-error" class="error text-danger" for="input-password">{{ $errors->first('password') }}</span>
                      @endif
                    </div>
                  </div>
                </div>
                <div class="row">
                  <label class="col-sm-2 col-form-label" for="input-password-confirmation">{{ __('Confirm New Password') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group">
                      <input class="form-control" name="password_confirmation" id="input-password-confirmation" type="password" placeholder="{{ __('Confirm New Password') }}" value="" required />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer ml-auto mr-auto">
                <button type="submit" class="btn btn-primary">{{ __('Change password') }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
@endsection
@push('js')
<script src="{{ asset('material') }}/js/plugins/jasny-bootstrap.min.js"></script>
@endpush