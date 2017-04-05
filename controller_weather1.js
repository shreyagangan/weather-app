/**
 * Created by Shreya on 6/27/2016.
 */
(function (angular) {
    'use strict';
    angular.module('weatherApp',[])
        .controller('HttpController',['$scope', '$http', function($scope,$http){
            $scope.city="Los Angeles";
            $scope.readfromURL=function(){
                //http://api.openweathermap.org/data/2.5/forecast/city?q=los+angeles&APPID=da3212ddf66fc2b87eb3cd10a539b1d6
                var city=$scope.city;
                var URL='http://api.openweathermap.org/data/2.5/forecast/city?q='+
                    city.toLowerCase().replace(" ","+")+
                    '&APPID=da3212ddf66fc2b87eb3cd10a539b1d6';
                $http.get(URL).success(function(data, status, headers, config) {

                    $scope.weatherReport= data;
                    //var temperatureK,temperatureF, humidity, weather, windspeed;
                    $scope.cityname=data.city.name;
                    var temperatureK = data.list[0].main.temp;//Convert Kelvin to F later!//['main'].temp;
                    $scope.temperatureF=kelvinToF(temperatureK);
                    $scope.humidity=data.list[0].main.humidity;
                    $scope.weather=data.list[0].weather[0].main;
                    $scope.windspeed = data.list[0].wind.speed;
                    $scope.date = data.list[0].dt_txt;

                    var date = new Date($scope.date);
                    var noOfday = date.getDay();
                    var daymap={0:"Sunday", 1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"}
                    $scope.day = daymap[noOfday];
                    console.log(temperatureK);
                    //console.log(temperatureF);
                    //console.log(humidity);
                    //console.log(weather);
                    //console.log(windspeed);
                });;
            };

            var kelvinToF=function(tempK)
            {
              return ((tempK * 1.8) - 459.67).toPrecision(2);
            };
        }]).filter('temperature', function() {
        return function(input) {
            return input+'℉';
        };
    });
})(window.angular);


