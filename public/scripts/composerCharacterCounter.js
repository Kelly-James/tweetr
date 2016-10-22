$(function() {

  const $counter = $('.counter');
  const $maxError = $('.max-error');

  const max = 140;

  function updateCharsLeft() {
    let len = $(this).val().length;
    let char = max - len;
    $counter.text(char + ' Characters Left');
    if (len >= max) {
      $counter.addClass('max');
    } else {
      $counter.removeClass('max');
    }
    if (len < 140) {
      $maxError.removeClass('active');
    }
  }

  $('.field').on('input', updateCharsLeft);
  $('.field').on('change', updateCharsLeft);

});





