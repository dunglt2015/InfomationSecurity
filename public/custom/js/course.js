// Carousel Auto-Cycle
$(document).ready(function() {
    var $content_1 = $("#content1");
    var $content_2 = $("#content2");
    var courseId = $('#courseId').text();
    var $enrollBtn = $('#btn-enroll');

    $.getJSON("http://localhost:8000/api/courses/"+courseId).done(function(course) {
        console.log(course);
        var htmlString_1 = "";
        htmlString_1 += "<h2>" + course.title + "</h2>";
        $content_1.append(htmlString_1);

        $.getJSON("http://localhost:8000/api/lessons/course/"+courseId).done(function(lessons){
            console.log(lessons);
            var htmlString_2 = "";
            var i;
            htmlString_2 += "<div class='col-md-6'>";
            htmlString_2 += "<div class='list-group'>";
            for (i = 0; i < lessons.length; i++) {
                var lesson = lessons[i];
                htmlString_2 += "<a id='"+ lesson._id + "' class='list-group-item'>Bai " + lesson.indexNumber;
                htmlString_2 += "<h4 class='list-group-item-heading'>" + lesson.title + "</h4>";
                if(lesson.status == 1){
                    htmlString_2 += "<span class='badge'>free</span>";
                }
                htmlString_2 += "<p class='list-group-item-text'>" +  lesson.totalTime + "ph</p>";
                htmlString_2 += "</a>";
            }
            htmlString_2 += "</div></div>";
            htmlString_2 += "<div class='col-md-5 col-md-offset-1'>";
            htmlString_2 += "<div class='list-group'>";
            htmlString_2 += "<a href='#' class='list-group-item'><h3>Lecturer:</h3>";
            htmlString_2 += "<p>"+ course.lecturer +"</p></a>";
            htmlString_2 += "<a href='#' class='list-group-item'><h3>About the Course:</h3>";
            htmlString_2 += "<p>"+ course.description +"</p></a>";
            htmlString_2 += "<a href='#' class='list-group-item'><h3>Price:</h3>";
            htmlString_2 += "<p>"+ course.price +"</p></a></div></div>";

            $content_2.append(htmlString_2);
        });
    });

    $enroll.on('click', enrollCourse);

    function enrollCourse(){

    }

});