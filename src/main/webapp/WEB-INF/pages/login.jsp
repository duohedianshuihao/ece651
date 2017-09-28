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
<div class='container-fluid'>
  <!-- <div class='row'>
    <div class='col-md-offset-4 col-md-4' id='error-message'>
      <div class="alert alert-warning alert-dismissible fade in" role='alert'>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
    </div>
  </div> -->
  <div class='row'>
    <div class='col-md-offset-4 col-md-4' id='login-info'>
      <form role="form", method='POST', action='#'>
        <div class="form-group">
          <label for="login-username">Username</label>
          <input class="form-control" id="login-username" placeholder="Username">
        </div>
        <div class="form-group">
          <label for="login-passwd">Password</label>
          <input type="password" class="form-control" id="login-passwd" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
     </div>
    </div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<script src="resources/bootstrap/js/bootstrap.min.js"></script>
<script src="resources/js/basic.js"></script>
</body>
</html>