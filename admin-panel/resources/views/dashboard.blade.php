@extends('layouts.app', ['activePage' => 'dashboard', 'titlePage' => __('Dashboard')])
@section('content')
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
              <div class="card-icon">
                <i class="material-icons">person</i>
              </div>
              <p class="card-category">Admin</p>
              <h3 class="card-title">
               76
                <!-- <small>GB</small> -->
              </h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <!-- <i class="material-icons text-danger">warning</i> -->
                <!-- <a href="#pablo">Get More Space...</a> -->
              </div>
            </div>
          </div>
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="material-icons">supervised_user_circle</i>
              </div>
              <p class="card-category">total User</p>
              <h3 class="card-title">
                12
              </h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <!-- <i class="material-icons">date_range</i> Last 24 Hours -->
              </div>
            </div>
          </div>
          <div class="card card-stats">
            <div class="card-header card-header-danger card-header-icon">
              <div class="card-icon">
                <i class="material-icons">mail_outline</i>
              </div>
              <p class="card-category">Total News</p>
              <h3 class="card-title">
             56
              </h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <!-- <i class="material-icons">local_offer</i> Tracked from Github -->
              </div>
            </div>
          </div>
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="material-icons">group</i>
              </div>
              <p class="card-category">Total Team</p>
              <h3 class="card-title">
               78
              </h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <!-- <i class="material-icons">update</i> Just Updated -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
@push('js')
@endpush