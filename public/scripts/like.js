$('.container').on('click', '.likes', function(){
  const userId = (window.location.href).split('/').pop();

  // const userId = req.session.user.id;
  const resourceId= $(this).parent().data('id');
  const currentLikes = Number($(this).siblings('.nOfLikes').text());
  //console.log('current total likes ', currentLikes)
  $.ajax(`/like/${resourceId}/${userId}`, { method: 'GET' })
      .then(function(counter){

        if(counter === 1)  {
          $(`div[data-id=${resourceId}] > .nOfLikes`).text(currentLikes - 1);
          $.ajax({
            url: `/unlike/${resourceId}/${userId}`,
            type: "PUT"
          })
          .done(function(res){
             console.log(counter);
            console.log('unliked')
          })
        } else if (counter === 0) {
          $(`div[data-id=${resourceId}] > .nOfLikes`).text(currentLikes + 1);
          $.ajax({
            url: `/like/${resourceId}/${userId}`,
            type: "PUT"
          })
          .done(function(res){
             console.log(counter);
            console.log('liked')
          })
        }
      })

})
