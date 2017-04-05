/**
 * Created by Shreya on 6/27/2016.
 */
(function (angular) {
    'use strict';
    angular.module('weatherApp',[])
        .controller('HttpController',['$scope', '$http', function($scope,$http){
            $scope.city="Los Angeles";
            $scope.readfromURL=function(){
                window.alert($scope.city);
                //http://api.openweathermap.org/data/2.5/forecast/city?q=los+angeles&APPID=da3212ddf66fc2b87eb3cd10a539b1d6
                var city=$scope.city;
                var URL='http://api.openweathermap.org/data/2.5/forecast/city?q='+
                    city.toLowerCase().replace(" ","+")+
                    '&APPID=da3212ddf66fc2b87eb3cd10a539b1d6';
                $scope.weatherReport=[];
                $scope.currentWeather={};
                $http.get(URL).success(function(data, status, headers, config) {

                    $scope.allweatherReport=data;
                    //$scope.cityname=data.city.name;
                    $scope.cityname=$scope.allweatherReport.city.name;
                    /*Today*/
                    var c_date = new Date(data.list[0].dt_txt);
                    var c_noOfday = c_date.getDay();
                    var c_daymap={0:"Sunday", 1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"}
                    var c_daytoday = c_daymap[c_noOfday];
                    $scope.currentWeather={
                        'temperature': kelvinToF(data.list[0].main.temp),
                        'humidity':data.list[0].main.humidity,
                        'weather':data.list[0].weather[0].main,
                        'windspeed':data.list[0].wind.speed,
                        'date':c_date,
                        'day':c_daytoday
                    };
                    //$scope.weatherReport.push(currentWeather);


                    /*Five Day*/
                    var count=1;
                    var noofdays=0;
                    var prevday=c_daytoday;
                    while(noofdays<5)
                    {
                        var date = new Date(data.list[count].dt_txt);
                        var noOfday = date.getDay();
                        var daymap={0:"Sunday", 1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"}
                        var daytoday = daymap[noOfday];
                        if(prevday.valueOf()!=daytoday.valueOf())
                        {
                            var weathertoday={
                                'temperature': kelvinToF(data.list[count].main.temp),
                                'humidity':data.list[count].main.humidity,
                                'weather':data.list[count].weather[0].main,
                                'windspeed':data.list[count].wind.speed,
                                'date':date,
                                'day':daytoday
                            };
                            $scope.weatherReport.push(weathertoday);
                            noofdays++;
                        }
                        prevday=daytoday;
                        count++;
                    };
                    //var temperatureK,temperatureF, humidity, weather, windspeed;


                    /*
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
                    console.log(temperatureK);*/
                    //console.log(temperatureF);
                    //console.log(humidity);
                    //console.log(weather);
                    //console.log(windspeed);
                });
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


