$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm A"));

console.log($(".container"));



$(".task-holder").on("click", ".task-hour", function() {
    $(this).removeClass("task-hour");
    var classList = $(this).attr("class").trim();
    var classArr = classList.split(" ");
    var prevTextEl = $(this).find("p");
    var text = prevTextEl.text();

    $(this).empty();
    $(this).replaceWith("<textarea></textarea>");

    $("textarea").addClass(classArr);
    $("textarea").val(text);
    $("textarea").focus();
});

$(".task-holder").on("blur", "textarea", function() {

    var text = $(this).val();
    var classList = $(this).attr("class").trim();
    var classArr = classList.split(" ");

    // delete textarea content and add div
    $(this).replaceWith("<div class='task-hour'></div>");

    // add back old classes to new div
    $(".task-hour").addClass(classArr);

    $(".task-hour").append("<p>");
    $(".task-hour p").text(text);
    $(".task-hour p").addClass("task-content");
   
});