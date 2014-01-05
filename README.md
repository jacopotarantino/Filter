# Filter

Chrome extension for custom text filtering and ad blocking.

Filter allows you to create custom text replacements for the internet. For example, change every instance of "Moar" to "More" or "My ex's name" to "Some slimebag". Update your filters through a friendly interface, search them or change them without even having to click a 'save' button. It also allows you to target specific CSS selectors for removal that more UI-intensive ad blockers might not be able to target. And lastly there's a spot to inject your own custom JS on every page.


## Installation

* Get the latest stable version at the [chrome web store](https://chrome.google.com/webstore/detail/filter/iehomgecbobmegkalpnhmmcmpjbkeclp).
* Click on the icon to open the options page.
* Add text substitutions in the first section, CSS selectors for unwanted page sections in the second and any custom javascript to be injected into every page on the third.


## TODO

* Trim down to vanilla javascript and don't depend on any external libs for content scripts.
* Find way to run on the page sooner or filter HTML during the request or at least before rendering.
* Proper validation of inputs.
* Unit tests.
* Checkbox-based addition of complicated features like removing facebook's ticker.


## Contributing

Please contribute if you like or use this plugin! Any little bit helps! If you can't spare the time or don't know how to code, request a feature and I'll try to implement it. If you'd like to see more fun open-source plugins, consider supporting my open-source work via [gittip](https://www.gittip.com/jacopotarantino/).
