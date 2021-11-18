<div class="sidebar" data-color="purple" data-background-color="black">
    <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  -->
    <div class="logo">
        <a href="/home" class="simple-text logo-normal" style="text-transform: none;">
            {{ __('Home') }}
        </a>
    </div>

    <div class="sidebar-wrapper">
        <ul class="nav">
            <li class="nav-item{{ $activePage == 'dashboard' ? ' active' : '' }}">
                <a class="nav-link" href="{{ route('home.index') }}">
                    <i class="material-icons">dashboard</i>
                    <p>{{ __('Dashboard') }}</p>
                </a>
            </li>
            <li class="nav-item{{ $activePage == 'product' ? ' active' : '' }}">
                <a class="nav-link" href="{{ route('product.index') }}">
                    <i class="material-icons">fastfood</i>
                    <p>{{ __('Products') }}</p>
                </a>
            </li>
        </ul>
    </div>
</div>
