<%@ page contentType = "text/html; charset = UTF-8" %>
<html lang="en" ng-app="">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
  <script src="resources/js/lib/angular/angular.js"></script>
  <script src="resources/js/lib/angular/angular-route.min.js"></script>
  <script src="resources/js/lib/angular/angular.min.js"></script>
</head>

<body>
  <!-- for the navigation part -->
  <div class="navbar navbar-default">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <div class="navbar-header">
            <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#collapse-content">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a href="/" class="navbar-brand">SharkJob</a>
          </div>

          <div class='navbar-collapse collapse' id="collapse-content">
            <ul class='nav navbar-nav'>
            </ul>
            <!-- for the signup and signin part, url needed -->
            <ul class="nav navbar-nav navbar-right">
              <li>
                <li><a href="/signup">sign up</a></li>
              </li>
              <li>
                <li><a href="/login">sign in</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>