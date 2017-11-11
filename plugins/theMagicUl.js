(function( $ ) {
    var dCitys = [
        { name: 'Murmansk', id: 524305 },
        { name: 'Moscow', id: 524901 },
        { name: 'Berlin', id: 2950159 },
        { name: 'Tokyo', id: 1850147 }
    ];
    var appData = [];

    $.fn.ulPlugin = function (animation, cityArray) {
        dCitys = cityArray || dCitys;
        function pushData(data) {
            data.list.forEach(function (val) {
                appData.push({name: val.name, temp: Math.round(val.main.temp)});
            });
            search();
        }

        var setURL = function () {
            var ids = '';

            const length = dCitys.length;

            for (var i = 0; i < length; i++) {
                if (i === length - 1) {
                    ids += dCitys[i].id;
                } else {
                    ids += dCitys[i].id + ','
                }
            }

            const toIds = 'group?id=';
            const apiKey = '&APPID=aa7eb28773adc3d0b474539123d26d68';
            const metric = '&units=metric';

            var URL = 'http://api.openweathermap.org/data/2.5/' +
                toIds + ids + apiKey + metric;
            return URL;
        };

        $.when($.fn.weatherAjax(setURL(), pushData));

        var self;
        self = this;

        this.click((event) => {
            var tgt = event.target;
            if(tgt.tagName === 'LI') {
                if(animation === 'up') {
                    this[0].prepend(tgt);
                } else {
                    this[0].append(tgt);
                }

            }
        });
        var search = function () {
            self.children().contents().each(function () {
                var self2 = this;
                var plusMinus = ' + ';
                appData.forEach((t) => {
                    if(t.temp < 0) {
                        plusMinus = ' - ';
                    }
                    if($.fn.serchSubstr(t.name, self2.data)) {
                        self2.data = self2.data + plusMinus + t.temp;
                    }
                });
            });
        };
    }

    $.fn.weatherAjax = function (url, callback) {
            $.get(url, function(data) {
                callback(data);
            });
    };

    $.fn.serchSubstr = function (sub, str) {

        return str.split(' ').some(function (value){
            return value === sub;
        });
    }
    $.fn.render = function () {

    };

})(jQuery);

var cityArray = [{ name: 'Minsk', id: 625144 }];

$('#12').ulPlugin('up');

//$('#12').ulPlugin('up', cityArray);