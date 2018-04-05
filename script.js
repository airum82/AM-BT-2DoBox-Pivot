//input variables
var $titleInput = $('.title-input');
var $bodyInput = $('.body-input');
var $searchInput = $('.search-input');
//button variables
var $saveInputButton = $('.save-button');
var $deleteButton = $('.delete-button');
var $upVoteButton = $('.up-vote');
var $downVoteButton = $('.down-vote');
var $ideaList = $('.idea-list');
//event listeners 
$saveInputButton.on('click', addIdeaToList);
var $ideas = [];

$('ol').on('click', 'li article .up-vote', function() {
    if ($(this).closest('article').hasClass('article')) {
        $('.q').text('Plausible');
        $(this).closest('article').attr(this.q, 'article-plausible')
    } else {
        ($(this).closest('article').hasClass('article-plausible'))
        $('.q').text('Genius');
        $(this).closest('article').attr('class', 'article-genius');
    }
});

$('ol').on('click', 'li article .down-vote', function() {
    if ($(this).closest('article').hasClass('article-genius')) {
        $('.q').text('Plausible');
        $(this).closest('article').attr('class', 'article-plausible')
    } else {
        ($(this).closest('article').hasClass('article-plausible'))
        $('.q').text('swill');
        $(this).closest('article').attr('class', 'article');
    }
});

$('ol').on('click', 'li article .delete-button', function() {
    $(this).closest('article').remove()
});


$(this).on('load', function() {
    var retrievedObject = localStorage.getItem('newIdea');
    var parsedObject = JSON.parse(retrievedObject);
    parsedObject.forEach(function(obj) {
        toHtml(obj);
    });
});

function clearForm() {
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
    e.preventDefault();
    var newIdea = new Idea($titleInput.val(), $bodyInput.val(), $.now())
    $ideas.push(newIdea);
    toHtml(newIdea);
    toLocalStorage();
    clearForm();
};

function toLocalStorage() {
    var objectToStore = $ideas;
    var stringifiedObject = JSON.stringify(objectToStore);
    localStorage.setItem("newIdea", stringifiedObject);
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
          <p class="quality"><span class="quality-serif">quality:</span> <span class="q">${newIdea.quality}</span></p>
        </article>
      </li>`);
};