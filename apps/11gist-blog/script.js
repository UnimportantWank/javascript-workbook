'use strict';

$(document).ready(function () {
  // You code here
  $.ajax('https://api.github.com/users/UnimportantWank/gists', {
    success: function (description) {
      console.log(description);
      // fliltering out anything that isn't a #post
      let filtered = description.filter(function (each) {
        return each.description.split(' ').includes("#post");
      })
      // getting rid of the posts text
      function filterPosts(text) {
        return text.split('#post').join(' ').trim();
      }
      //log the filtered posts
      console.log(filtered);
      filtered.forEach(function (each) {
        console.log(each);
        var string = `
           <div>
             <li>${filterPosts(each.description)}</li>
             <li><a href="#" data-url="${each.url}" data-comments="${each.comments_url}" data-id="https://api.github.com/users/UnimportantWank/gists/${each.id}.json">view</a></li>
           </div>`;
        console.log(string);
        //populate the page with content matching the filter
        $('#posts').append(string);


      })
      //on click event to show the comments
      $('a[href="#"]').on('click', function (event) {
        console.log('whatever');
        //prevent the page from refreshing
        event.preventDefault();
        //populate the data
        //this is the link that was clicked
        // ajax function call
        $.ajax(
          $(this).data('url'), {
            success: function (post) {
              console.log(post);
              var postLog = post['files']['post.md'].content
              $('#post').empty();
              $('#post').append(
                postLog);
            }
          }
        ) //show the comments
        $.ajax(
          $(this).data('comments'), {
            success: function (comments) {
              //empty before you append
              $('#comments').empty()
              console.log(comments);
              comments.forEach(function (post) {
                var comment = $('<li>' + post.user.login + ': ' + post.body + '</li>');
                $('#comments').html(comment);
              })
            }
          })
      })
    }
  })

});


/*

*/
