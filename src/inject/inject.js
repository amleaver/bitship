chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		chrome.storage.sync.get(['bitbucket_url', 'codeship_project_id', 'codeship_project_uuid'], function(storage) {
			if (!document.URL.match(storage['bitbucket_url'])) {
				return
			}

			branch_name = document.evaluate("(//*[contains(concat(' ', @class, ' '), ' branch ')]/a/text())[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
			description_node = document.evaluate("//*[contains(concat(' ', @class, ' '), ' description ')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue

			var codeship_link = document.createElement("a")
			codeship_link.setAttribute('href', 'https://codeship.com/projects/' + storage['codeship_project_id'] )
			var codeship_badge = document.createElement("img");
			codeship_badge.setAttribute('src', 'https://codeship.com/projects/' + storage['codeship_project_uuid'] + '/status?branch=' + branch_name)
			codeship_link.appendChild(codeship_badge);


			var codeship_div = document.createElement("div")
			codeship_div.setAttribute('class', 'clearfix')

			var codeship_dt = document.createElement("dt")
			codeship_text = document.createTextNode("Codeship")
			codeship_dt.appendChild(codeship_text)

			var codeship_dd = document.createElement("dd")
			codeship_dd.appendChild(codeship_link)

			codeship_div.appendChild(codeship_dt)
			codeship_div.appendChild(codeship_dd)

			description_node.parentNode.insertBefore(codeship_div, description_node.nextSibling);
		});
	}
	}, 10);
});