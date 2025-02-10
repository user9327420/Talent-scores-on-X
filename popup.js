
var url = '', api_key = '';
const tabs = await chrome.tabs.query({url: ["https://x.com/*"]});
document.querySelector('h1').innerHTML = 'Open on an X profile';

tabs.forEach(function(tab) {
	if (tab.active) {
		url = tab.url.replace('https://x.com/', '');
		var keyword = tab.title;
		if (url.indexOf('/') == -1 && keyword.indexOf('@') != -1 && keyword.indexOf(' X') != -1) {

			document.querySelector('h1').innerHTML = 'loading';

			keyword = keyword.match(/.*\(/);
			if (keyword.length < 1) { return; }
			keyword = keyword[0].replace(' (', '');
			console.log('keyword', keyword);

			fetch('https://api.talentprotocol.com/api/v2/passports?keyword=' + encodeURIComponent(keyword), {method: 'GET', headers: {'X-API-KEY': api_key}}).then(r => r.text()).then(data => {
				if (data !== 'undefined' && data !== undefined) {

					// display score

					console.log('display score');
					data = JSON.parse(data);


					if (data != '' && Object.keys(data).indexOf('passports') != -1 && data.passports.length > 0) {
						data = data['passports'][0];

						console.log('score', data.score);

						document.querySelector('h1').innerHTML = '';
						document.querySelector('.score').innerHTML = data.score.toString();
						document.querySelector('.name').innerHTML = data.passport_profile.display_name.toString() + ' ↗';
						document.querySelector('.talent-id').innerHTML = '#' + data.passport_id.toString();

						var link = 'https://app.talentprotocol.com/profile/' + data.passport_id.toString();
						document.querySelector('.talent-score-link').href = link;
						document.querySelector('.talent-name-link').href = link;
						document.querySelector('.talent-id-link').href = link;

						var talent_score = document.createElement('div');
						talent_score.innerHTML = data.score.toString();
						talent_score.classList.add('talent_score');
						talent_score.setAttribute('style', 'color: rgb(231, 233, 234); background: #383838; border-radius: 3px; display: inline; padding: 0px 5px; margin: 0px 8px;');

					} else {
						document.querySelector('h1').innerHTML = 'error';
					}
				} else {
					document.querySelector('h1').innerHTML = 'error';
				}
			});
		}
	}
});
