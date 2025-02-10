
function talentScore() {

	url = window.location.href.replace('https://x.com/', '');
	var keyword = document.title;

	var api_key = '';

	// checking if page is a X profile
	console.log('checking if page is a X profile');
	if (url.indexOf('/') == -1 && keyword.indexOf('@') != -1 && keyword.indexOf(' X') != -1) {

		function callback() {
			// handle reply from api
			if (xhr.readyState === XMLHttpRequest.DONE) {
				console.log('api reply ', xhr.status == 200 ? 'no error' : 'error');

				if (xhr.status === 200) {
					// display builder score on profile
					var data = xhr.responseText;
					if (data !== 'undefined' && data !== undefined) {
						data = JSON.parse(xhr.responseText);

						if (data != '' && Object.keys(data).indexOf('passports') != -1 && data.passports.length > 0) {
							data = data['passports'][0];

							console.log('score', data.score);

							var talent_score = document.createElement('div');
							talent_score.innerHTML = data.score.toString();
							talent_score.classList.add('talent_score');
							talent_score.setAttribute('style', 'color: rgb(231, 233, 234); background: #383838; border-radius: 3px; display: inline; padding: 0px 5px; margin: 0px 8px;');

							console.log('talent_score', talent_score);
							document.body.querySelector('[data-testid="UserName"]').querySelector('span').querySelector('span').appendChild(talent_score);
						}
					}
				}
			}
		}

		// send request to API
		console.log('sending API request');

		var keyword = document.title;
		console.log(document.title);
		keyword = keyword.match(/.*\(/);
		if (keyword.length < 1) { return; }
		keyword = keyword[0].replace(' (', '');
		console.log('keyword', keyword);

		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.talentprotocol.com/api/v2/passports?keyword=' + encodeURIComponent(keyword), true);
		xhr.setRequestHeader('X-API-KEY', api_key);
		xhr.onreadystatechange = callback;
		xhr.send();
	}
}

// timeout to wait for the profile to load
window.setTimeout(talentScore, 2000);
