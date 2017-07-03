angular.module('mainController', [])
    .controller('mainCtrl', function($scope, $http) {

        setData();

        function setData() {
            console.log("radi");
            $http({
                method: "get",
                url: "/api"
            }).then(function(result) {
                console.log(result.data);
                $scope.data = result.data;
            }, function(err) {
                console.log(err.status);
            })
        }
        $scope.deleteTodo = function(id) {
            $http({
                method: "post",
                url: "/deleteTodo",
                data: {
                    id: id
                }
            }).then(function() {
                setData();
            })
        }

        $scope.addNewTodo = function() {
            console.log("wtf");
            $http({
                method: 'post',
                url: "/addNewTodo",
                data: {
                    newTodo: $scope.newTodo
                }
            }).then(function(result) {
                setData();
            }, function(err) {
                console.log(err);
            })
        }
    })