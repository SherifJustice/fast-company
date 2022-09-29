import React from 'react'

const BookMark = ({ status, id, handleToggleBookMark }) => {
	return (
		<button
			className={status ? 'bi bi-bookmark-heart-fill' : 'bi bi-bookmark'}
			onClick={() => {
				handleToggleBookMark(id)
			}}
		></button>
	)
}

export default BookMark
