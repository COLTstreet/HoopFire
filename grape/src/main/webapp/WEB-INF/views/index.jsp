
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>



<head>
<base href="/grape/">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="icon" type="image/png" href="/resources/css/img/favicon.ico" sizes="32x32">
<title>HoopFire</title>


<link rel="icon" type="image/png" href="/resources/img/favicon2.png" />


<!-- CSS &  Fonts  -->
<link href="/resources/css/angular-material.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/angular-toastr.css" rel="stylesheet" type="text/css">
<link href="/resources/css/animate.css" rel="stylesheet" type="text/css">
<link href="/resources/css/custom.css" rel="stylesheet" type="text/css">
<link href="/resources/css/md-data-table.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="/resources/css/font-awesome-4.7.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/css?family=Lato|PT+Sans|Rubik|Roboto" rel="stylesheet">

<!-- JQuery  -->
<!-- <script src="resources/js/jquery/jquery.min.js"></script> -->

<!--Angular Resources-->
<script src="/resources/js/angular/angular.min.js"></script>
<script src="/resources/js/angular/angular-animate.min.js"></script>
<script src="/resources/js/angular/angular-toastr.min.js"></script>
<script src="/resources/js/angular/angular-aria.min.js"></script>
<script src="/resources/js/angular/angular-route.js"></script>
<script src="/resources/js/angular/angular-resource.min.js"></script>
<script src="/resources/js/angular/angular-cookies.min.js"></script>
<script src="/resources/js/angular/angular-jwt.js"></script>
<script src="/resources/js/angular/angular-ui-switch.min.js"></script>


<!-- Angular Material Resources -->
<script src="/resources/js/material/material.min.js"></script>
<script src="/resources/js/material/md-data-table.min.js"></script>

<!-- Grape App specific resources  -->
<script src="/resources/js/grape/controllers/grapeControllers.js"></script>
<script src="/resources/js/grape/controllers/homeController.js"></script>
<script src="/resources/js/grape/controllers/navController.js"></script>
<script src="/resources/js/grape/controllers/nbaController.js"></script>
<script src="/resources/js/grape/controllers/ncaaController.js"></script>
<script src="/resources/js/grape/controllers/marchController.js"></script>
<script src="/resources/js/grape/controllers/marchWestController.js"></script>
<script src="/resources/js/grape/controllers/marchEastController.js"></script>
<script src="/resources/js/grape/controllers/marchSouthController.js"></script>
<script src="/resources/js/grape/controllers/marchMidwestController.js"></script>
<script src="/resources/js/grape/controllers/finalFourController.js"></script>
<script src="/resources/js/grape/services/alertservice.js"></script>
<script src="/resources/js/grape/services/sharedServices.js"></script>
<script src="/resources/js/grape/app/grape-app.js"></script>
    
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-93688409-1', 'auto');
  ga('send', 'pageview');

</script>


</head>
<body ng-app="grapeApp">
	<ng-view></ng-view>
</body>

</html>