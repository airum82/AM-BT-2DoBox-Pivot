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

$('ol').on('click', 'li article .delete-button', removeIdea);

function removeIdea() {
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
    $(this).closest('article').children('h1').css('text-decoration', 'line-through');
}

$('ol').on('blur', 'li article .body', updateBody);

function updateBody() {
    var retrievedToDo = $(this).parent().parent().attr('id');
    var toDo = JSON.parse(localStorage.getItem(retrievedToDo));
    toDo.body = $(this).text();
    toLocalStorage(retrievedToDo, toDo);
}

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
};