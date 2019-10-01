var slideIndex = 0;
showSlides();

function showSlides() {
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 3 seconds
}

$(".hamburger").click(function(){
    $("#nav").toggle();   
       
   });     

   $(document).ready(function() {
    $('.input-group input[required]').on('keyup change', function() {
    	var $form = $(this).closest('form'),
            $group = $(this).closest('.input-group'),
			$addon = $group.find('.input-group-addon'),
			$icon = $addon.find('span'),
			state = false;
            
    	if (!$group.data('validate')) {
			state = $(this).val() ? true : false;
		}else if ($group.data('validate') == "email") {
			state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())
		} else if ($group.data('validate') == "first-name"){
      state = /^([a-zA-Z_\.\-])+$/.test($(this).val())
    }
    else if ($group.data('validate') == "last-name"){
      state = /^([a-zA-Z_\.\-])+$/.test($(this).val())
    }
    else if ($group.data('validate') == "password") {
      state = /^([a-zA-Z0-9_\.\-])+$/.test($(this).val())
      console.log(this)
    } 
    else if ($group.data('validate') == "confirm-password") {
			state = /^([a-zA-Z0-9_\.\-])+$/.test($(this).val())
		} 

		if (state) {
				$addon.removeClass('danger');
				$addon.addClass('success');
				$icon.attr('class', 'glyphicon glyphicon-ok');
		}else{
				$addon.removeClass('success');
				$addon.addClass('danger');
				$icon.attr('class', 'glyphicon glyphicon-remove');
		}
        
        if ($form.find('.input-group-addon.danger').length == 0) {
            $form.find('[type="submit"]').prop('disabled', false);
        }else{
            $form.find('[type="submit"]').prop('disabled', true);
        }
	});
    
    $('.input-group input[required], .input-group textarea[required], .input-group select[required]').trigger('change');
    
    
});