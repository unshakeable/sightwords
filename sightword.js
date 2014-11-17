$('document').ready(function(){
	var myPoints = 0;
	sightWordModule.displayWord(0);
	$('#next').on('click',function () { 
		sightWordModule.nextWord();
		$('#inputWord').val('').prop('disabled', false).focus();
		var audio = document.getElementById("audio");
		audio.play();
	});
	$('#previous').on('click',function () { 
		sightWordModule.previousWord();
		$('#inputWord').val('').prop('disabled', false).focus();
		var audio = document.getElementById("audio");
		audio.play();
	});
	$('#speaker').on('click', function(){
		var audio = document.getElementById("audio");
		audio.play();
		$('#inputWord').focus();
	});

	$('.toggleWord').on('click', function () {
		$('#word').toggle();
	});

	$("#inputWord").keyup(function (e) {
		var selectedWord = $('#word').html();
		var currentWord = $(this).val();
		var cheersAudio = document.getElementById("cheers");
		console.log(selectedWord,currentWord);
		if(selectedWord.substring(0, currentWord.length) === currentWord){
			console.log('match');
			e.preventDefault();
			if(selectedWord === currentWord){
				$(this).css({"border-color": "green", 
					"border-weight":"1px", 
					"border-style":"solid"});
				$(this).prop('disabled', true);
				myPoints += selectedWord.length;
				$('#myPoints').html(myPoints);
				cheersAudio.play();
			}
		} else {
			console.log('mismatch');
			$(this).val(currentWord.substring(0, currentWord.length - 1));
			$('#word').html();
			var audio = document.getElementById("audio");
			audio.play();
			$(this).css({"border-color": "red", 
					"border-weight":"1px", 
					"border-style":"solid"});
			myPoints -= 1;
			$('#myPoints').html(myPoints);
		}
	});
});

var sightWordModule = (function navigation () {
	var idx = 0;
	var mySightWord = ['and', 'the', 'it', 'i', 'like', 'we','up', 'play','to', 'a', 'yes', 'can', 'big', 'in', 'at', 'an', 'look', 'run', 'me', 'dad', 'one', 'put', 'make', 'am', 'you', 'go', 'mom', 'did', 'said','is', 'have', 'see', 'my', 'come', ];
    
	var displayWord = function(idx){
		$('#word').html(mySightWord[idx]).hide();
		$('#audio').attr('src','http://www.gstatic.com/dictionary/static/sounds/de/0/'+mySightWord[idx]+'.mp3');
	}


	var nextWord = function(){
		(idx === mySightWord.length - 1)? idx = 0 : idx++;
		displayWord(idx);
	}

	var previousWord = function(){
		( idx === 0 ) ? ( idx = mySightWord.length - 1 ) : idx--;
		displayWord(idx);
	}
	var addWord = function(word){
		mySightWord.push(word);
	}

	return {
		nextWord: nextWord,
		previousWord: previousWord,
		addWord : addWord,
		displayWord : displayWord
	}
})();    