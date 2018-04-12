$('.save-button').on('click', addTaskToList);

$('ol').on('click', 'li article .up-vote', voteUp);

function voteUp() {
    if ($(this).closest('article').children('p').children('.q').text() === 'swill') {
        $(this).closest('article').children('p').children('.q').text('Plausible');
        $(this).closest('article').addClass('article-plausible')
    } else {
        ($(this).closest('article').addClass('article-genius'))
        $(this).closest('article').children('p').children('.q').text('Genius');
        $(this).closest('article').attr('class', 'article-genius');
    }
};

$('ol').on('click', 'li article .down-vote', voteDown);

function voteDown() {
    if ($(this).closest('article').hasClass('article-genius')) {
        $(this).closest('article').children('p').children('.q').text('Plausible');
        $(this).closest('article').attr('class', 'article-plausible')
    } else {
        ($(this).closest('article').hasClass('article-plausible'))
        $(this).closest('article').children('p').children('.q').text('swill');
        $(this).closest('article').attr('class', 'article');
    }
};

$('ol').on('click', 'li article .delete-button', removeTask);

function removeTask() {
    $(this).closest('article').remove();
    var taskId = localStorage.key($(this).parent().attr('id'));
    localStorage.removeItem(taskId);
};

$(this).on('load', persistTasks);

function persistTasks() {
    for(var i = 0; i < localStorage.length; i++) {
        var newTask = JSON.parse(localStorage.getItem(localStorage.key(i)));
        toHtml(newTask);   
    }
};

function clearForm($titleInput, $bodyInput) {
    $titleInput.val('');
    $bodyInput.val('');
};

function Task(title, body, id, quality, done) {
    this.title = title,
    this.body = body,
    this.id = id,
    this.quality = quality || 'swill'
    this.done = done || ''
};

function addTaskToList(e) {
    var $titleInput = $('.title-input');
    var $bodyInput = $('.body-input');
    var newId = $.now()
    e.preventDefault();
    var newTask = new Task($titleInput.val(), $bodyInput.val(), newId)
    toHtml(newTask);
    toLocalStorage(newId, newTask);
    clearForm($titleInput, $bodyInput);
};

function toLocalStorage(newId, newTask) {
    var stringifiedObject = JSON.stringify(newTask);
    localStorage.setItem(newId, stringifiedObject);
};

$('ol').on('click', 'li article .completed', completeTask);

function completeTask() {
    $(this).closest('li').addClass('marked-task');
    $(this).parent().siblings('button').addClass('marked-task');
    var clickedLi = $(this).closest('li');
    moveToDone(clickedLi);
}

function moveToDone(clickedLi) {
    var attr = clickedLi.prop('class');
    var newStorage = attr + ' done';
    if(attr === 'marked-task') {
    var retrievedTask = clickedLi.prop('id');
    var task = JSON.parse(localStorage.getItem(retrievedTask));
    task.done = newStorage;
    toLocalStorage(retrievedTask, task);
    } 
} 

$('ol').on('blur', 'li article .body', updateBody);

function updateBody() {
    var retrievedTask = $(this).parent().parent().attr('id');
    var task = JSON.parse(localStorage.getItem(retrievedTask));
    task.body = $(this).text();
    toLocalStorage(retrievedTask, task);
}

$('ol').on('blur', 'li article .title', updateTitle)

function updateTitle() {
    var retrievedTask = $(this).parent().parent().attr('id');
    var task = JSON.parse(localStorage.getItem(retrievedTask));
    task.title = $(this).text();
    toLocalStorage(retrievedTask, task);
}

$('.search-input').on('keyup', filterTasks);

function filterTasks() {
    var searchInput = $(this).val();
    $('li').map(function(index, el) {
        var result = $(el);
        var title = result.children().children('h1').text();
        var body = result.children().children('.body').text();
        if(title.includes(searchInput) || body.includes(searchInput)) {
            return result.show();
        } else {
            return result.hide();
        }
    })
};

function toHtml(newTask) {

    $("ol").prepend(`
      <li id="${newTask.id}" class="${newTask.done}">
        <article class="article">
          <button class='delete-button'></button>
          <h1 class="title" contenteditable="true">${newTask.title}</h1>
          <p class="body" contenteditable="true">${newTask.body}</p>
          <button id="up" class="up-vote swill"></button>
          <button id="down" class="down-vote swill"></button>
          <p class="quality"><span class="quality-serif">quality:</span> <span class="q">${newTask.quality}</span>
          <button class="completed">Completed Task</button>
          </p>
        </article>
      </li>`);
};