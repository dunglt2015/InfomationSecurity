// Carousel Auto-Cycle
$(document).ready(function() {
    var $content_admin = $("#admin-content");
    var userId = $("#userId").text();


    $.getJSON("https://localhost:8000/api/users").done(function(users){
        $.getJSON("https://localhost:8000/api/courses").done(function(courses){

        var content = "";
        var i,j;
            content += "<div class='col-md-4'>";
            content += "<div class='list-group'>";
            for (i = 0; i < users.length; i++) {
                var user = users[i];
                content += "<a href='#' class='list-group-item'>" + user.name;
                content += "<h4 class='list-group-item-heading'>" + user.email + "</h4>";
                content += "</a>";
            }
            content += "</div></div>";
            content += "<div class='col-md-6 col-md-offset-2'>";
            content += "<div class='list-group'>";
            for (j = 0; j < courses.length; j++) {
                var course = courses[j];
                content += "<a href='#' class='list-group-item'>" + course.title;
                content += "<h4 class='list-group-item-heading'>" + course.lecturer + "</h4>";
                content += "</a>";
            }
            content += "</div></div>";
            $content_admin.append(content);
        });
    });
});