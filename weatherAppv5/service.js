/**
 * Created by Shreya on 7/7/2016.
 */
(function(angular){
    'use strict';
    angular.module('GetWeatherService',[])
        .factory('GetWeatherService',function($http){
            var factory={};
            //var fivedayweather=["Hello!","World!"];
            var fivedayweather=[{}];
            factory.getWeather=function(city){
                fivedayweather=[{}];
                console.log(city);
                var URL='http://api.openweathermap.org/data/2.5/forecast?q='+
                    city.toLowerCase().replace(" ","+")+
                    '&APPID=da3212ddf66fc2b87eb3cd10a539b1d6';
                console.log(URL);
                $http.get(URL).success(function(data, status, headers, config) {
                    console.log(status);
                    /*Five Day*/
                    var count=0;
                    var noofdays=0;
                    var prevday="";
                    while(noofdays<5 && count<40)
                    {
                        var date = new Date(data.list[count]['dt_txt']);
                        var noOfday = date.getDay();
                        var daymap={0:"Sunday", 1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"}
                        var daytoday = daymap[noOfday];
                        if(prevday.valueOf()!=daytoday.valueOf())
                        {
                            var weathertoday={
                                'dayNum':noofdays,
                                'temperature': ((data.list[count].main.temp * 1.8) - 459.67).toPrecision(2),//kelvinToF(data.list[count].main.temp),
                                'humidity':data.list[count].main.humidity,
                                'weather':data.list[count].weather[0].main,
                                'windspeed':data.list[count].wind.speed,
                                'date':date,
                                'day':daytoday
                            };
                            fivedayweather.push(weathertoday);
                            noofdays++;
                        }
                        prevday=daytoday;
                        count++;
                    };
                    //console.log(noofdays);
                });
                fivedayweather.splice(0,1);
                console.log(fivedayweather);
                return fivedayweather;
            };
            return factory;
        });
    angular.module('SetDayWeatherService',[])
        .service('SetDayWeatherService',function(){
            this.setDayWeather=function(x,i)
            {
                return x[i];
            };

        });    /*angular.module('SetDayWeatherService',[])
        .factory('SetDayWeatherService',function($http){

        });*/
})(window.angular);
