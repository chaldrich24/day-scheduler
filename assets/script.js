$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm A"));
var taskList = [];

// when div is clicked
$(".task-holder").on("click", ".task-hour", function() {
    // get div classes and text to pass into textarea
    $(this).removeClass("task-hour");
    var classList = $(this).attr("class").trim();
    var classArr = classList.split(" ");
    var prevTextEl = $(this).find("p");
    var text = prevTextEl.text();

    // clear p tag and replace div with textarea
    $(this).empty();
    $(this).replaceWith("<textarea></textarea>");

    // pass classes and text to textarea and focus
    $("textarea").addClass(classArr);
    $("textarea").val(text);
    $("textarea").focus();
});

// when clicking out of textarea
$(".task-holder").on("blur", "textarea", function() {
    // get textarea classes and text to pass into new div
    var text = $(this).val();
    var classList = $(this).attr("class").trim();
    var classArr = classList.split(" ");

    // create new div with classes and p tag with textarea text 
    var newDiv = $("<div>");
    newDiv.addClass(classArr);
    newDiv.addClass("task-hour")
    newDiv.append("<p class='task-content'>" + text + "</p>");

    // delete textarea content and add div
    $(this).replaceWith(newDiv.get(0));
    
   
});

var saveTask = function(event) {
    // get id of div parent element
    var taskHour = event.target.parentNode.id;
    var replace = false;

    // if click on icon 
    if ($(event.target).is("span")) {
        console.log("span");
        taskHour = event.target.parentNode.parentNode.id;
    }

    // get text in div of .task-hour
    var task = $("#" + taskHour + " .task-hour p").text();
    // create object to save
    var taskObj = {"task": task, "taskHour": taskHour};

    // push to array of objects if taskList is  populated
    if (taskList) {
        for (i = 0; i < taskList.length; i++) {
            // allows for replacement of task at respective hour
            if (taskList[i].taskHour === taskObj.taskHour) {
                taskList.splice(i, 1);
                taskList.push(taskObj);
                replace = true;
            }
        }
    }

    if (!replace) {
        taskList.push(taskObj);
    }
    
    // push array to localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));

    $("#save-message").append("<p class='save-msg'><span class='oi oi-check'></span>Item saved to local storage!</p>");
    setTimeout(function() {$("#save-message").empty();}, 2000);
};

var loadTasks = function() {
    // end function if nothing in localStorage
    if (localStorage.getItem("tasks") === null) {
        return false;
    }

    else {
        taskList = JSON.parse(localStorage.getItem("tasks"));
    }

    // loop through taskList holding localStorage items and display to correct time slot
    for (i = 0; i < taskList.length; i++) {
        var taskEl = $("#" + taskList[i].taskHour + " .task-hour p");
        taskEl.text(taskList[i].task)
    }
};

loadTasks();

$(".save-task").on("click", saveTask);

var currentHour = moment().format("HH");
currentHour = parseInt(currentHour);
i = 9

// loop through each child div of .container and add style class based on time compared to current
$(".container").children().each(function() {
    $(this).attr("hour", i);

    if (currentHour > $(this).attr("hour")) {
        currentDiv = $(this).find(".task-hour");
        currentDiv.addClass("bg-secondary border-dark border-bottom");
    }
    else if (currentHour === parseInt($(this).attr("hour"))) {
        currentDiv = $(this).find(".task-hour");
        currentDiv.addClass("bg-danger border-dark border-bottom");
    }
    else if (currentHour < $(this).attr("hour")) {
        currentDiv = $(this).find(".task-hour");
        currentDiv.addClass("bg-success border-dark border-bottom");
    }
    i++;
});


