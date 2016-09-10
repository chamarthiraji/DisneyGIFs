	var topics = ["Aladdin","Alice","Ariel"," Olaf","Goofy","cindrella","Belle","pocahontas","Anna","Elsa","Tinkerbell"];
			var imagesCreated = false;

			$( document ).ready(function() {
				renderButtons();
				$(document).on('click', '.characters', displayMovieInfo);
			});


			function renderButtons(){
				$("#character_buttons").empty();

				for(var i =0;i < topics.length;i++) {

					var a = $('<button class="label label-info">');
				    a.addClass('characters');  
				    a.attr('data-name', topics[i]); 
				    a.text(topics[i]); 
				    $('#character_buttons').append(a); 

				}
				
			}

			
			function displayMovieInfo(){
				var characters = $(this).attr('data-name');
				var queryURL = "http://api.giphy.com/v1/gifs/search?q="+characters+"&api_key=dc6zaTOxFJmzC ";
				if ( imagesCreated ) {
					removeImages();
				}	

				$.ajax({
					url: queryURL,
					method: 'GET'
					}).done(function(response) {
						$('#gifimages_view').hide();
			     	 		//$("#gifimages_view").html(JSON.stringify(response));
			     	 		console.log(response);
			     			// $("#gif_view").html(response.data.images.fixed_height);
			     			var results = response.data;
			     			var searchedImagesLength = results.length;
			     			if ( searchedImagesLength > 10){
			     				searchedImagesLength = 10;
			     			}

			     			for (var i = 0; i < searchedImagesLength ; i++) {
		     				 	if (!imagesCreated){
		     				 		imagesCreated = true;
		     				 	}	
			                    var gifDiv = $('<div  class="item">')
			                    var rating = results[i].rating;
			                    var p = $('<p>').text("Rating: " + rating);
			                    var personImage = $('<img  ids="imageid"+i class="image col-xs-6 col-md-4  ">');
			                    personImage.attr('src', results[i].images.fixed_height_still.url);
			                    personImage.attr('data-still',results[i].images.fixed_height_still.url);
			                    personImage.attr('data-animate',results[i].images.fixed_height.url);
			                    personImage.attr('data-state','still');
			                    
			                    gifDiv.append(p)
			                    gifDiv.append(personImage)
			                    $('#gifimages_view').prepend(gifDiv);
			                    $('#gifimages_view').show();
			                }
			                $(".image").on('click', toggleImage);


						}); 
				
			}

			function toggleImage() {
				
					var state = $(this).attr('data-state');
					console.log("State:"+state);
					if ( state == 'still'){
		                $(this).attr('src', $(this).data('animate'));
		                $(this).attr('data-state', 'animate');
		            }else if ( state == 'animate') {
		                $(this).attr('src', $(this).data('still'));
		                $(this).attr('data-state', 'still');
		            }
		        
			}

			function removeImages() {
				for (var i = 0; i < 10 ; i++) {
					$(".item").remove();
				}
			}

			$('#submit_button').on('click', function(){
				var character = $('#character_input').val().trim();
				if(topics.indexOf(character) == -1)
				{	
					topics.push(character);
					renderButtons();
			    }
				return false;
			});

			
			