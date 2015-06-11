+function (window) {
	'use strict';

	var document = window.document

	/**
	 * The constructor.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-07
	 */
	var App = function () {
		/** @type 	{Node} 		Represents the bubble. */
		this.elem = document.createElement('div')
		this.elem.classList.add('bubble--container')
		this.elem.innerHTML = '<div class="bubble"></div>'

		/** @type 	{Boolean}  	Whether the element is added or not. */
		this.added = false

		this.addListener()
		// this.init() - see issue gmail-entire-message issue #2
	}

	/**
	 * Adds the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-07
	 */
	App.prototype.init = function () {
		if (window.location.hash.indexOf('/') === -1) return this.hideBubble()
		if (this.added) return this.updateBubble()

		document.body.appendChild(this.elem)
		this.added = true
		this.updateBubble()
	}

	/**
	 * Updates the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-11
	 */
	App.prototype.updateBubble = function () {
		var elem = document.querySelector('table[role="presentation"] td > div:last-child div:nth-child(3)').querySelectorAll('.kv, .hn')
		console.log(elem)
		if (elem[0]) {
			var count = elem.length
			if (count > 1) {
				this.elem.children[0].textContent = count
				return this.showBubble()
			}
		}

		this.hideBubble()
	}

	/**
	 * Hides the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-11
	 */
	App.prototype.hideBubble = function () {
		this.elem.classList.add('hide')
	}

	/**
	 * Shows the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-11
	 * @return {[type]}    [description]
	 */
	App.prototype.showBubble = function () {
		this.elem.classList.remove('hide')
	}

	/**
	 * Adds event listeners.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-07
	 */
	App.prototype.addListener = function () {
		/** hashchanges */
		window.addEventListener('hashchange', this.init.bind(this), false)
	}

	new App()
} (window);