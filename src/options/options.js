// Saves options to chrome.storage
function save_options() {
  	var bitbucket_url = document.getElementById('bitbucket_url').value;
  var codeship_project_id = document.getElementById('codeship_project_id').value;
	var codeship_project_uuid = document.getElementById('codeship_project_uuid').value;
  chrome.storage.sync.set({
    bitbucket_url: bitbucket_url,
    codeship_project_id: codeship_project_id,
    codeship_project_uuid: codeship_project_uuid
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    bitbucket_url: 'https://bitbucket.org/acme/foo/',
    codeship_project_id: '1337',
    codeship_project_uuid: 'XXXX'
  }, function(items) {
    document.getElementById('bitbucket_url').value = items.bitbucket_url;
    document.getElementById('codeship_project_id').value = items.codeship_project_id;
    document.getElementById('codeship_project_uuid').value = items.codeship_project_uuid;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);