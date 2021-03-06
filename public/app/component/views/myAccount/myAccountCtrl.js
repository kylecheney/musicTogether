angular.module("musApp").controller("myAccountCtrl", function($scope, myAccountServ, $rootScope, $state) {


  $scope.getCurrentUser = function() {
      myAccountServ.getCurrentUser().then(function(response, $rootScope) {
          $scope.parent = response;
      });
  }();


    $scope.getClassSchedule = function() {
        myAccountServ.getClassSchedule().then(function(response) {
            $scope.schedule = response;
        });
    }();

//This adds scope to the models in the register tab
    $scope.addClassToScope = function(course){
      $scope.course = course;
    };





$scope.addChildToCourse = function(course, child, parent) {
    var amount_due = 0;
    var childAge = new Date(child.birthdate);
    var age = moment(childAge).fromNow().split(' ');
    if(age[1] === 'year' || age[1] === 'years'){
      age[0] = 12;
    }
    else if(age[0] > 9){
      age[0] = 9;
    }
    else age[0] = 8;
    child.month_age = age[0];
    // console.log(child);

//THIS FUNCTION WILL CALCULATE COST
    cost(parent.children, parent.new_user); //calling cost function
    function cost(childArr, returning) {
      var regFee = 15;
      var totalCost = 145;

      console.log(childArr);
        // childArr = childArr.filter(function(element, index, array) {
        //     if (element.schedule_id && element.month_age) return element;
        // });
        // console.log(childArr);


        childArr = childArr.sort(function(a, b) {
            return b.month_age - a.month_age;
        });
        console.log(childArr);


        for (var i = 1; i < childArr.length; i++) {
            if (childArr[i].schedule_id)
            console.log(childArr[i].month_age);
                if (childArr[i].month_age > 8) totalCost += 70;
        }

        if (returning) amount_due = totalCost;
        else amount_due = totalCost + regFee;
    }

//PASSING THIS DATA TO THE BACK END
    var data = {
        course: course,
        child: child.c_id,
        month_age: child.month_age,
        amount_due: amount_due,
        parent_id: child.parent_id
    };

    // console.log(data);

    //ADDING COST INTO THE EQUALTION
    myAccountServ.addChildToCourse(data).then(function(response) {

        $rootScope.amount_due = response.amount_due;
        swal(
          'Awesome!',
          'your total is now '+ response.amount_due,
          'success'
        );

    });

};

$scope.logout = function() {
myAccountServ.logout().then(function(response) {
    $rootScope.currentUserSignedIn = false;
    $state.go('home');
});
};



});
