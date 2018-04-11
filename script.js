$('.save-button').on('click', addIdeaToList);

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

$('ol').on('click', 'li article .delete-button', removeToDo);

function removeToDo() {
    $(this).closest('article').remove();
    var ideaId = localStorage.key($(this).parent().attr('id'));
    localStorage.removeItem(ideaId);
};

$(this).on('load', persistIdeas);

function persistIdeas() {
    // var retrievedObject = localStorage.getItem();
    // var parsedObject = JSON.parse(retrievedObject);
    // parsedObject.forEach(function(obj, index) {
    //     toHtml(obj);
    for(var i = 0; i < localStorage.length; i++) {
        var newIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
        toHtml(newIdea);   
    }
};

function clearForm($titleInput, $bodyInput) {
    $titleInput.val('');
    $bodyInput.val('');
};

function Idea(title, body, id, quality) {
    this.title = title,
    this.body = body,
    this.id = id,
    this.quality = quality || 'swill'
};

function addIdeaToList(e) {
    var $titleInput = $('.title-input');
    var $bodyInput = $('.body-input');
    var newId = $.now()
    e.preventDefault();
    var newIdea = new Idea($titleInput.val(), $bodyInput.val(), newId)
    toHtml(newIdea);
    toLocalStorage(newId, newIdea);
    clearForm($titleInput, $bodyInput);
};

function toLocalStorage(newId, newIdea) {
    var stringifiedObject = JSON.stringify(newIdea);
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
    if(attr === 'marked-task') {
    var retrievedToDo = clickedLi.prop('id');
    console.log(retrievedToDo);
    var toDo = JSON.parse(localStorage.getItem(retrievedToDo));
    toDo.done = attr;
    toLocalStorage(retrievedToDo, toDo);
    } 
} 

$('ol').on('blur', 'li article .body', updateBody);

function updateBody() {
    var retrievedToDo = $(this).parent().parent().attr('id');
    var toDo = JSON.parse(localStorage.getItem(retrievedToDo));
    toDo.body = $(this).text();
    toLocalStorage(retrievedToDo, toDo);
}

$('ol').on('blur', 'li article .title', updateTitle)

function updateTitle() {
    var retrievedToDo = $(this).parent().parent().attr('id');
    var toDo = JSON.parse(localStorage.getItem(retrievedToDo));
    toDo.title = $(this).text();
    toLocalStorage(retrievedToDo, toDo);
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

function toHtml(newIdea) {

    $("ol").prepend(`
      <li id="${newIdea.id}">
        <article class="article">
          <button class='delete-button'></button>
          <h1 class="title" contenteditable="true">${newIdea.title}</h1>
          <p class="body" contenteditable="true">${newIdea.body}</p>
          <button id="up" class="up-vote swill"></button>
          <button id="down" class="down-vote swill"></button>
          <p class="quality"><span class="quality-serif">quality:</span> <span class="q">${newIdea.quality}</span>
          <button class="completed">Completed Task</button>
          </p>
        </article>
      </li>`);

    if(newIdea.done == 'marked-task') {
        $('li').addClass('done marked-task');
    }
};