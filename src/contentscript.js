(function (window) {
	'use strict';

	var document = window.document

	/**
	 * The constructor.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-07
	 */
	function App() {
		/** @type 	{Node} 		Represents the bubble. */
		this.elem = document.createElement('div')
		this.elem.classList.add('bubble--container')
		this.elem.innerHTML = '<div class="bubble"></div>'

		/** @type 	{Boolean}  	Whether the element is added or not. */
		this.added = false

		this.addListener()
		// this.init() - see issue gmail-entire-message issue #2
	}

	var proto = App.prototype

	/**
	 * Adds the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-07
	 */
	proto.init = function () {
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
	proto.updateBubble = function () {
		var elem = document.querySelector('div[role="main"] table[role="presentation"] td > div:last-child > div:nth-child(2) div:nth-child(3)')
		console.log(elem)
		if (elem) {
			elem = elem.querySelectorAll('.kv, .hn, .h7')

			if (elem[0]) {
				elem = elem.length // count
				if (elem > 1) {
					this.elem.children[0].textContent = elem
					// window.requestIdleCallback(this.updateBubble.bind(this)) // a few msgs might be loading
					return this.showBubble()
				}
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
	proto.hideBubble = function () {
		this.elem.classList.add('hide')
	}

	/**
	 * Shows the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-11
	 */
	proto.showBubble = function () {
		this.elem.classList.remove('hide')
	}

	/**
	 * Adds event listeners.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-07
	 */
	proto.addListener = function () {
		/** hashchanges */
		window.addEventListener('hashchange', this.init.bind(this), false)
	}

	new App()
} (window));
