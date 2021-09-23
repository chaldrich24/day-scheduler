$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm A"));
var taskList = [];
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

    var newDiv = $("<div>");
    newDiv.addClass(classArr);
    newDiv.addClass("task-hour")
    newDiv.append("<p class='task-content'>" + text + "</p>");

    // delete textarea content and add div
    $(this).replaceWith(newDiv.get(0));
    
   
});

var saveTask = function(event) {
    var taskHour = event.target.parentNode.id;
    var replace = false;

    if ($(event.target).is("span")) {
        console.log("span");
        taskHour = event.target.parentNode.parentNode.id;
    }

    var task = $("#" + taskHour + " .task-hour p").text();
    var taskObj = {"task": task, "taskHour": taskHour};
    
    for (i = 0; i < taskList.length; i++) {
        if (taskList[i].taskHour === taskObj.taskHour) {
            taskList.splice(i, 1);
            taskList.push(taskObj);
            replace = true;
        }
    }

    if (!replace) {
        taskList.push(taskObj);
    }
    
    localStorage.setItem("tasks", JSON.stringify(taskList));
};

var loadTasks = function() {
    taskList = JSON.parse(localStorage.getItem("tasks"));
    if (!taskList) {
        return false;
    }
    for (i = 0; i < taskList.length; i++) {
        var taskEl = $("#" + taskList[i].taskHour + " .task-hour p");
        taskEl.text(taskList[i].task)
    }
};

loadTasks();

$(".save-task").on("click", saveTask);