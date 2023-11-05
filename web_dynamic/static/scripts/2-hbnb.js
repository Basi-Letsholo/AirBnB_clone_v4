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

    $.get('http://0.0.0.0:5001/api/v1/status/', function () {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
