
var app = angular.module('studentsApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider 
      .when('/', {
          templateUrl : 'partials/all_students.html',    // route for the home page
          controller : 'allCtrl'
      })
      .when('/all_students', {
          templateUrl : 'partials/all_students.html',
          controller : 'allCtrl'
      })
      .when('/add_student', {
          templateUrl : 'partials/add_student.html',    // add a student to db
          controller : 'addCtrl'
      })
      .when('/edit_students', {
          templateUrl : 'partials/edit_students.html',    // edit a student record
          controller : 'editCtrl'
      })
      .otherwise({
          redirectTo: 'partials/all_students.html'        // any other URL goes to home
      });
});


/*   a controller for each page  */
app.controller('allCtrl', function($scope, $http) {
    
   $http.get("/showAll")          // get all the students
     .then(function (response) {
	    $scope.students = response.data;  
     });
});

app.controller('addCtrl', function($scope, $http) {

    $scope.addStudent = function() {      // add a student
        var info = {
            sid : $scope.sid,       // set up data object
            first_name : $scope.firstname,
            last_name : $scope.lastname,
            major : $scope.major
        }

        url = "/addStudent"

        $http.post(url, info)         // post the object data
            .then(function (response) {
                 $scope.status = response.data;   //print status of request

           // clear textboxes
           $scope.sid = "";
           $scope.firstname = "";
           $scope.lastname = "";
        });
    };
});

app.controller('editCtrl', function($scope, $http) {  // edit miles or price of record
   
    $scope.getStudent = function() {        
		sid = $scope.student.sid;
		url = "/getOne?sid="+sid;
		$http.get(url)
			.then(function (response) {
				$scope.student = response.data; 
				console.log($scope.student);
			});
	}
   
   $scope.updateRecord = function() {
	   
	   var student = $scope.student;
	   console.log(student);
	   var info = {
	      sid : student.sid,
		  major : student.major,
	      midterm : student.midterm,
		  final : student.final
	  }
	   console.log(info);
	   url = "/updateStudent";
	   $http.post(url, info)
          .then(function (response) {
			 $scope.status = response.data;
      });
   }
});