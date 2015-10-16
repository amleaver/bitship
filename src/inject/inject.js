chrome.extension.sendMessage({}, function() {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			chrome.storage.sync.get(["bitbucket_url", "codeship_project_id", "codeship_project_uuid"], function(storage) {
				if (!document.URL.match(storage["bitbucket_url"])) {
					return;
				}

				var branch_name = document.getElementsByClassName("branch")[0];
				branch_name = branch_name.textContent.trim();

				var codeship_link = document.createElement("a");
				codeship_link.setAttribute("href", "https://codeship.com/projects/" + storage["codeship_project_id"]);
				var codeship_badge = document.createElement("img");
				codeship_badge.setAttribute("src", "https://codeship.com/projects/" + storage["codeship_project_uuid"] + "/status?branch=" + branch_name);
				codeship_link.appendChild(codeship_badge);

				var codeshipDiv = document.createElement("div");
				codeshipDiv.style.marginTop = "5px";
				codeshipDiv.setAttribute("class", "clearfix");

				var codeshipElementDt = document.createElement("dt");
				var codeshipText = document.createTextNode("Codeship");
				codeshipElementDt.appendChild(codeshipText);

				var codeshipElementDd = document.createElement("dd");
				codeshipElementDd.appendChild(codeship_link);

				codeshipDiv.appendChild(codeshipElementDt);
				codeshipDiv.appendChild(codeshipElementDd);

				var overviewContainer = document.getElementsByClassName("main")[0].children[0];
				overviewContainer.appendChild(codeshipDiv);
			});
		}
	}, 10);
});
