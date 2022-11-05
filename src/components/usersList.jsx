import React from 'react'
// import PropTypes from 'prop-types'
// import Quality from './quality'
// import BookMark from './bookmark'
const User = ({
	_id,
	name,
	qualities,
	profession,
	completedMeetings,
	rate,
	bookmark,
}) => {
	return (
		<>
			<h1>{name}</h1>
			{/* <>
				{qualities.find((qual) => (
					<Quality {...qual} key={qual._id} />
				))}
			</> */}
			<h2>{profession.name}</h2>
			<>{completedMeetings}</>
			<h2>{rate}</h2>
			{/* <>
				<BookMark status={bookmark} />
			</> */}
			<>
				<button className="btn btn-danger">Все пользователи</button>
			</>
		</>
	)
}
User.propTypes = {
	// _id: PropTypes.string.isRequired,
	// name: PropTypes.string.isRequired,
	// qualities: PropTypes.array,
	// profession: PropTypes.object.isRequired,
	// completedMeetings: PropTypes.number.isRequired,
	// rate: PropTypes.number.isRequired,
	// onDelete: PropTypes.func.isRequired,
	// bookmark: PropTypes.bool,
	// onToggleBookMark: PropTypes.func.isRequired,
}

export default User
