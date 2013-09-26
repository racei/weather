// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/


$(document).ready(function(){
  if(window.curweather){
    if(screen.width <480){
      $('#bg').css('background', 'url('+window.curweather+'-mob.jpg)')
        .css('background-size', 'cover')
        .css('background-repeat', 'no-repeat')
        .css('background-position', 'center center')
        .css('background-attachment', 'fixed').css('background-size', '100% 100%');
    }else{
      $('#bg').css('background', 'url('+window.curweather+'.jpg) no-repeat center center fixed').css('background-size', 'cover').css('height', '100%');
      $('#wrap').css('height', '100%');
      $('body').css('height', '100%');
      $('html').css('height', '100%');
    }
  }

  var pac_input = document.getElementById('searchbox');

    (function pacSelectFirst(input) {
        // store the original event binding function
        var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

        function addEventListenerWrapper(type, listener) {
            // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
            // and then trigger the original listener.
            if (type == "keydown") {
                var orig_listener = listener;
                listener = function(event) {
                    var suggestion_selected = $(".pac-item-selected").length > 0;
                    if (event.which == 13 && !suggestion_selected) {
                        var simulated_downarrow = $.Event("keydown", {
                            keyCode: 40,
                            which: 40
                        });
                        orig_listener.apply(input, [simulated_downarrow]);
                    }

                    orig_listener.apply(input, [event]);
                };
            }

            _addEventListener.apply(input, [type, listener]);
        }

        input.addEventListener = addEventListenerWrapper;
        input.attachEvent = addEventListenerWrapper;

        var autocomplete = new google.maps.places.Autocomplete(input);

    })(pac_input);
});
