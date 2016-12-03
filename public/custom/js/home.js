// Carousel Auto-Cycle
$(document).ready(function() {
    var $courseSlide = $("#courseSlide");

    $.getJSON("http://localhost:3000/api/courses").done(function(courses) {
        var length = courses.length;
        var numberOfPage = Math.ceil(length / 4);
        var htmlString = '';
        var itemClass = '';
        var i, j, temp, count;

        for (i = 0; i < numberOfPage; i++) {
            if (i == 0) {
                itemClass = 'item active';
            } else {
                itemClass = 'item';
            }

            htmlString += "<div class='" + itemClass + "'>";
            htmlString += " <ul class='thumbnails'>";
            for (j = 0; j < 4; j++) {
            	count = i * 4 + j;
                temp = courses[count];
                htmlString += "<li class='col-sm-3'>";
                htmlString += "<div class='fff'>";
                htmlString += "<div class='thumbnail'>";
                htmlString += "<a href='/courses/" + temp._id + "'><img src='/images/" + temp.image + "' alt=''></a></div><div class='caption'>";
                htmlString += "<h4>" + temp.title + "</h4>";
                htmlString += "<p>" + temp.lecturer + "</p>";
                htmlString += "<a class='btn btn-mini' href='/courses/" + temp._id + "'>» More</a></div></div></li>";
                if ((j == 3) || (count == (length - 1))) {
                    htmlString += "</ul></div>";
                    if(count == length -1){ break;}
                }
            }
        }
        $courseSlide.append(htmlString);
    });

    $('.carousel').carousel({
        interval: 5000
    })
});