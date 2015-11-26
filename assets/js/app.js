//dependencies

angular.module('chatApp', ['ngRoute']);
//Route

angular.module('chatApp').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: "/Chat/views/index.html",
            controller: 'chatController'
        }).
        when('/chat', {
            templateUrl: "/Chat/views/chatView.html",
            controller: 'chatController'
        });
    }]);


//Controllers


//angular.module('chatApp').
//        controller("chatController", function ($scope, $interval, $http) {
//            $scope.keyPress = function (keycode) {
//                if (keycode === 13) {
//                    $http({
//                        method: "post",
//                        url: "/Chat/index.php/ChatController/saveChat",
//                        data: {
//                            chatMessage: $scope.chatMsg,
//                            uname: $scope.userName
//                        }
//                    }).success(function (data, status, headers, config) {
//                        $scope.chatMsg = "";
//                    }).error(function (data, status, headers, config) {
//                        alert("Something is wrong! please try again later");
//                    });
////                    $scope.messages = $scope.chatMsg;
//                }
//            };
//
//            $scope.checkNewChats = function () {
//                $messagesCount = 0;
//                if (!$scope.messages) {
//                    $messagesCount = 0;
//                }
//                else {
//                    $messagesCount = $scope.messages.length;
//                }
//                $http({
//                    method: "post",
//                    url: "/Chat/index.php/ChatController/retrieveChats",
//                    data: {
//                        noOfChats: $messagesCount,
//                    }
//                }).success(function (data, status, headers, config) {
//                    if (!data.noChange) {
//                        $scope.messages = data.chats;
//                    }
//                }).error(function (data, status, headers, config) {
//                    alert("Something is wrong! please try again later");
//                });
//            }
//
//            $scope.init = function () {
//                var userName = window.prompt("Type your name", "Name");
//                $scope.userName = userName;
//            }
//
//            $interval(function () {
//                $scope.checkNewChats();
//            },1000);
//
//        });


angular.module('chatApp').
controller("chatController", function ($scope, $interval, $http) {
    $scope.keyPress = function (keycode) {
        if (keycode === 13) {
            var request = request('request');

            request({
                url: "/Chat/index.php/ChatController/saveChat",
                qs: {chatMessage: $scope.chatMsg, uname: $scope.userName},
                method: 'post'
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response.statusCode, body);
                }
            });
        }
    };

    $scope.checkNewChats = function () {
        $messagesCount = 0;
        if (!$scope.messages) {
            $messagesCount = 0;
        }
        else {
            $messagesCount = $scope.messages.length;
        }
        var request = request('request');

        request({
            url: "/Chat/index.php/ChatController/retrieveChats",
            qs: {noOfChats: $messagesCount},
            method: 'post'
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                if (!data.noChange) {
                    $scope.messages = data.chats;
                }
            }
        })
        //$http({
        //    method: "post",
        //    url: "/Chat/index.php/ChatController/retrieveChats",
        //    data: {
        //        noOfChats: $messagesCount,
        //    }
        //}).success(function (data, status, headers, config) {
        //    if (!data.noChange) {
        //        $scope.messages = data.chats;
        //    }
        //}).error(function (data, status, headers, config) {
        //    alert("Something is wrong! please try again later");
        //});
    }

    $scope.init = function () {
        var userName = window.prompt("Type your name", "Name");
        $scope.userName = userName;
    }

    $interval(function () {
        $scope.checkNewChats();
    }, 1000);

});