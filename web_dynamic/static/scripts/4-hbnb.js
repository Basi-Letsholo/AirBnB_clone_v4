$(document).ready(function () {
    const amenityIds = {};

    $('input[type="checkbox"]').change(function() {
        const checkbox = $(this);
        const amenityId = checkbox.data('id');
        const amenity = checkbox.data('name');

        if (checkbox.is(':checked')) {
            amenityIds[amenityId] = amenity;
        } else {
            delete amenityIds[amenityId];
        }

        const amenityList = Object.values(amenityIds).join(', ');
        $('div.amenities h4').text(amenityList);
    });

    $('#search_button').click(function() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (data) {
                for (const place of data) {
                    const article = $('<article></article>');
                    article.append('<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>');
                    article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div></div>');
                    article.append('<div class="description">' + place.description + '</div>');
                    $('.places').append(article);
                }
            },

            error: function () {
                console.log('{"error":"Notfound"}');
            }
        });
    });

    $.get('http://0.0.0.0:5001/api/v1/status/', function () {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
