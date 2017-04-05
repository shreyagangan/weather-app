/**
 * Created by Shreya on 6/29/2016.
 */
(function(angular){
    'use strict';
    angular.module('myWeatherApp',[])
        .controller('weatherController',['$scope','$http', function($scope,$http){

            //$scope.weatherReport=[];
            $scope.currentWeather={};
            $scope.dayWeather={};

            /*Default View when no city entered*/
            $scope.enteredCity = { cityUrl: 'default_view.html' };

            /*View After city is entered*/
            $scope.citySubmit=function(){
                $scope.enteredCity = { cityUrl: 'cityWeather.html' };
                var city=$scope.city;
                var URL='http://api.openweathermap.org/data/2.5/forecast/city?q='+
                    city.toLowerCase().replace(" ","+")+
                    '&APPID=da3212ddf66fc2b87eb3cd10a539b1d6';
                $scope.weatherReport=[];
                $http.get(URL).success(function(data, status, headers, config) {
                    $scope.allweatherReport = data;
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
                    /*Five Day*/
                    var count=0;
                    var noofdays=0;
                    //var prevday=c_daytoday;
                    var prevday="";
                    while(noofdays<5 && count<40)
                    {
                        console.log(count);
                        console.log(data.list[count].dt_txt);
                        var date = new Date(data.list[count]['dt_txt']);
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


                });

            };

            /*Get Day Weather*/
            $scope.getDayWeather=function(dayReport){
                $scope.currentWeather={
                    'temperature': dayReport.temperature,
                    'humidity':dayReport.humidity,
                    'weather':dayReport.weather,
                    'windspeed':dayReport.windspeed,
                    'date':dayReport.date,
                    'day':dayReport.day
                };

                console.log(dayReport.day);
                console.log(dayReport.weather);
                //console.log(weatherDay);
            };

            var kelvinToF=function(tempK)
            {
                return ((tempK * 1.8) - 459.67).toPrecision(2);
            };


            $scope.selectedView={ viewURL: 'currentWeather.html'};
            $scope.viewName="Current";

            $scope.viewCurrent=function(){
                $scope.viewName="Current";
                $scope.selectedView={ viewURL: 'currentWeather.html'};
            };

            $scope.viewFiveDay=function(){
                $scope.viewName="Five-Day Forecast";
                $scope.selectedView={ viewURL: 'fiveDayWeather.html'};
            };

            $scope.dayView={ viewURL: 'DayWeather.html'};

        }])
        .filter('temperature', function() {
            return function(input) {
                return input+'℉';
            };
        })
})(window.angular);