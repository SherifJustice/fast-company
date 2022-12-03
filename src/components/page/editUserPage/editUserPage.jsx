import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import MultiSelectField from '../../common/form/multiSelectField'
import RadioField from '../../common/form/radioField'
import api from '../../../api'

const EditUserPage = () => {
	const params = useParams()
	const [data, setData] = useState({
		name: '',
		email: '',
		profession: '',
		sex: 'male',
		qualities: [],
	})
	const [qualities, setQualities] = useState({})
	const [professions, setProfession] = useState()
	const [errors, setErrors] = useState({})
	useEffect(() => {
		api.users.getById(params.userID).then((data) => setData(data))
	}, [])
	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfession(data))
		api.qualities.fetchAll().then((data) => setQualities(data))
	}, [])
	const handleChange = (target) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }))
	}
	const handleSubmit = () => {
		// history.push(`/users/{userID}`)
	}
	console.log(data.qualities)
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Имя"
				name="name"
				value={data.name}
				onChange={handleChange}
			/>
			<TextField
				label="Электронная почта"
				name="email"
				value={data.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<SelectField
				label="Выберите Вашу профессию"
				defaultOption="Choose..."
				name="profession"
				options={professions}
				onChange={handleChange}
				value={data.profession.name}
				error={errors.profession}
			/>
			<MultiSelectField
				options={qualities}
				onChange={handleChange}
				defaultValue={data.qualities}
				name="qualities"
				label="Выберите Ваши качества"
			/>
			<RadioField
				options={[
					{ name: 'Male', value: 'male' },
					{ name: 'Female', value: 'female' },
					{ name: 'Other', value: 'other' },
				]}
				value={data.sex}
				name="sex"
				onChange={handleChange}
				label="Выберите Ваш пол"
			/>

			<button type="submit" className="btn btn-primary w-100 mx-auto">
				Обновить
			</button>
		</form>
	)
}

export default EditUserPage
