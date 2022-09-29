import React from 'react'

function SearchStatus({ length }) {
	function numOfMet(number) {
		const lastOne = Number(number.toString().slice(-1))
		if (number > 4 && number < 15) return 'человек тусанет'
		if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут'
		if (lastOne === 1) return 'человек тусанет'
	}
	if (length > 0) {
		return (
			<h2>
				<span className={'badge m-1 bg-primary'}>
					{length + ' '}
					{numOfMet(length)} с тобой сегодня
				</span>
			</h2>
		)
	} else {
		return (
			<h2>
				<span className={'badge m-1 bg-danger'}>
					Никто не тусанет с тобой сегодня
				</span>
			</h2>
		)
	}
}

export default SearchStatus
