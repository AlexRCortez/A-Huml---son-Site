const navbarHTML=`<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container-fluid">
        <div class="d-flex" style="flex: 1;">
          <a class="navbar-brand" href="index.html">A Huml & Son II LLC</a>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul class="navbar-nav text-center">
            <li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="Interior.html">Interior</a></li>
            <li class="nav-item"><a class="nav-link" Href="Exterior.html">Exterior</a></li>
            <li class="nav-item"><a class="nav-link" href="snowplow.html">Snow</a></li>
            <li class="nav-item"><a class="nav-link" href="aboutus.html">About Us</a></li>
            <li class="nav-item"><a class="nav-link" href="contactUs.html">Contact Us</a></li>
            <li class="nav-item"><a class="nav-link" href="Gallery.html">Gallery</a></li>
          </ul>
        </div>
        <div class="d-none d-lg-block" style="flex: 1;"></div>
      </div>
    </nav>`;
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;