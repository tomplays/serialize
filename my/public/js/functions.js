'use_strict'

function my_serialize(form_val){
	 //console.log(form_val)
	 $('.serialized').remove();
	 //var tt =  Serialize.fromText( '<p>t<code>e</code><em>x</em>t</p>')
	 //console.log(tt) >> ????
	 //var form_val = '<code><strong>O</strong>nce</code> <strong>upo<em>upon</strong>n</em> a ti<a href="http://hello.com"> link </a>me Feels like we <em><i>only go</i></em> backwards';
	 //
	 // 

	 // push "virtual" element to dom
	 var elem = add( '<div class="added">'+form_val+'</div>')
	
	 // and serialize it	
	 var serialization = new Serialize(elem)
	 //console.log(serialization);
 
 	
	 // output text result
	 var output = '<div class="serialized">';
		 output += '<div>'+serialization.text+'</div>';
		 // loop markups
		 output += '<ul>'
		 _.each(serialization.markups , function(markup, i){
		 	output += '<li class="serialized_mk"> from '+markup.start+' to '+markup.end+' ('+markup.type+')</li>'
		 })	
		  output += '</ul>'
	 output += '</div>'
	 $("body").append(output)

}


// util
function add(el){
	 thiselem = document.createElement('div');
	 thiselem.innerHTML = el;
	 document.body.appendChild(thiselem)
	 $(".added").hide()
	 return thiselem;
}


$( document ).ready(function() {
    
    // bind change event to reload serialization
	$("#source_area").bind('keyup', function(){ 
		//$('#source_area').on('propertychange', function() {
	 	//console.log($(this).val())
	 	var string = $(this).val().replace( /\r?\n/g, "\r\n" );
	 	my_serialize(string);
	});
});


//console.log(serialization)

// this.elem = document.createElement('p') 