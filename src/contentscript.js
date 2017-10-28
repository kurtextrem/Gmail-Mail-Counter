;(function(window) {
	'use strict'

	const document = window.document

	/** @type 	{Node} 		Represents the bubble. */
	const div = document.createElement('div')
	div.classList.add('bubble--container')
	div.innerHTML = '<div class="bubble"></div>'

	/** @type 	{Boolean}  	Whether the element is added or not. */
	let added = false

	/**
	 * Adds the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-07
	 */
	const label = /#label\/.+\/.+/
	const inbox = /#(inbox|imp|all)\/.+/
	const hide = () => window.requestAnimationFrame(hideBubble)
	const update = () => window.requestAnimationFrame(updateBubble)
	function init() {
		const hash = document.location.hash
		if (!label.test(hash) && !inbox.test(hash)) return hide()
		if (added) return update()

		document.body.appendChild(div)
		added = true
		update()
	}

	/**
	 * Updates the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-11
	 */
	function updateBubble() {
		let elem = document.querySelector('div[role="main"] table[role="presentation"] td > div:last-child > div:nth-child(2) div:nth-child(3)')
		// console.log(div)
		if (elem) {
			elem = elem.querySelectorAll('.kv, .hn, .h7')

			if (elem[0]) {
				elem = elem.length // count
				if (elem > 1) {
					div.children[0].textContent = elem
					// window.requestIdleCallback(updateBubble.bind(this)) // a few msgs might be loading
					return showBubble()
				}
			}
		}
		hideBubble()
	}

	/**
	 * Hides the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-11
	 */
	function hideBubble() {
		div.setAttribute('aria-hidden', 'true')
		div.style.display = 'none'
	}

	/**
	 * Shows the bubble.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-11
	 */
	function showBubble() {
		div.removeAttribute('aria-hidden')
		div.style.display = 'block'
	}

	/**
	 * Adds event listeners.
	 *
	 * @author 	Jacob Groß
	 * @date   	2015-06-07
	 */
	function addListener() {
		/** hashchanges */
		window.addEventListener('hashchange', init, false)
	}

	addListener()
})(window)
