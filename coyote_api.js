const config = require('./config')

async function addStrength(strength) {
	fetch(config.makeUrl('/strength_config'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			strength: {
				add: strength
			}
		})
	})
}

async function reduceStrength(strength) {
	fetch(config.makeUrl('/strength_config'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			strength: {
				sub: strength
			}
		})
	})
}

async function fire(strength, time) {
	fetch(config.makeUrl('/fire'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			time: time * 1000,
			strength: strength
		})
	})
}

module.exports = { addStrength, reduceStrength, fire }