weatherApp.controller('homeController',['$scope','cityService',function ($scope,$cityService){
    $scope.city = $cityService.city;
    $scope.$watch('city',function (newValue) {
        $cityService.city = newValue;
    })
}]);

weatherApp.controller('forecastController',['$scope','$resource','cityService',
    function ($scope,$resource,$cityService,$routeParams){
        $scope.city = $cityService.city;
        $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast",{
            callback:'JSON_CALLBACK'},{
            get:{
                method:'JSONP'
            }
        });
        $scope.weatherResult = $scope.weatherApi.get({
            q:$scope.city,
            appid:""
        });
        $scope.convertToCelsius = function (degK) {
            return Math.round(degK - 273.15);
        }
        $scope.convertToDate = function (dt) {
            return new Date(dt*1000);
        }
    }]);