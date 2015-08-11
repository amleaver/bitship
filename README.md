# BitShip

BitShip is a simple Chrome extension for integrating a BitBucket repository with Codeship. Specifically it'll show a pull request's Codeship build status alongside the usual information:

<img src="https://raw.githubusercontent.com/amleaver/bitship/master/documentation/example.png" width="400">

## Installation

For now this plugin needs to be installed manually as it hasn't been added to the Chrome web store.

## Configuration

Once the extension is installed you'll need to configure it from the extensions management page (chrome://extensions/). The options page needs to be updated with the following:

* BitBucket Repository URL - the complete URL to your BitBucket repository
* Codeship Project ID - the numeric ID for your Codeship Project
* Codeship Project UUID - your Codeship project's UUID, you'll find this under the "General" project settings

## TODO

* Cleanup source, it's currently userscript that has been converted to a Chrome extension
* Add support for configuration of multiple BitBucket repositories
