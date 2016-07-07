ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map ('map', {
        center: [55.76, 37.64],
        zoom: 10
    });
    var placemark = new ymaps.Placemark([55.8, 37.6], {
        balloonContent: 'Магазин в Москве',
        hintContent: 'Магазин в Москве ул. Вавилова 66'
    });
    myMap.geoObjects.add(placemark);
    placemark.balloon.close();
    myMap.controls.add('mapTools');
    myMap.controls.add('typeSelector');
    myMap.controls.add('zoomControl');


}