$(function() {

function renderTweets(tweets) {
  // tweets.sort((a, b) => {a.time - b.time})  // silly Jeremy
  tweets.forEach(function(tweet) {
    $('#tweet-container').prepend(createTweetElement(tweet));
  });
}

function createTweetElement(tweet) {
  var firstName = tweet.user.name;
  var smallAvatarUrl = tweet.user.avatars.small;
  var tag = tweet.user.handle;
  var spew = tweet.content.text;
  var timeStamp = tweet.created_at;

  var $tweet = $('<article></article').addClass('tweet');
  var $header = $('<header></header>');
  var $footer = $('<footer></footer>');

  $header.append($(`<img src="${smallAvatarUrl}">`).addClass('avatar'));
  $header.append($(`<span>${firstName}</span>`).addClass('user'));
  $header.append($(`<span>${tag}</span>`).addClass('usertag'));

  $tweet.append($header);
  $tweet.append($(`<content>${spew}</content>`));

  var $div = $('<div></div>');

  ['fa-flag', 'fa-retweet', 'fa-heart'].forEach(function(icon) {
    $div.append($(`<i class="fa ${icon}"></i>`));
  });

  $footer.append($(`<span>${timeStamp}</span>`).addClass('timeCount'));
  $footer.append($div);

  $tweet.append($footer);

  return $tweet;

}

function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: function (tweets) {
      console.log(tweets);
      renderTweets(tweets)
    }
  });
}

$('.toggle').click(function() {
  $('.compose-container').slideToggle(1000);
});


$("#tweet-form").submit(function(event) {
  event.preventDefault();
  var $textarea = $('.field');
  var input = $textarea.val();
  var form_data = $(this).serialize();
  if(input.length === 0) {
    $('.min-error').addClass('active');
    setTimeout(function() {
      $('.min-error').removeClass('active');
    }, 1000);
  } else if (input.length > 140) {
    $('.max-error').addClass('active');
  } else {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: form_data,
      success: function(data) {
        $('.compose-container').slideToggle(1000);
        loadTweets();
        $textarea.val('');
        $('.field').change(); // to trigger the charCounter stuffs
      },
      error: function(jqxhr, status, error) {
        console.log("tweet submission error: ", error);
      }
    })
  }
});

loadTweets();

});




