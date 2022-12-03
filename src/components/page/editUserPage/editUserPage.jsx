import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import MultiSelectField from '../../common/form/multiSelectField'
import RadioField from '../../common/form/radioField'
import api from '../../../api'

const EditUserPage = () => {
	const params = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState({
		name: '',
		email: '',
		profession: '',
		sex: 'yes',
		qualities: [],
	})
	const [qualities, setQualities] = useState([])
	const [professions, setProfession] = useState([])
	const [errors, setErrors] = useState({})
	const history = useHistory()

	const getProfessionById = (id) => {
		for (const prof of professions) {
			if (prof.value === id) {
				return { _id: prof.value, name: prof.label }
			}
		}
	}

	const getQualitiesById = (elements) => {
		const qualitiesArray = []
		for (const elem of elements) {
			for (const qualitie in qualities) {
				if (elem.value === qualities[qualitie].value) {
					qualitiesArray.push({
						_id: qualities[qualitie].value,
						name: qualities[qualitie].label,
						color: qualities[qualitie].color,
					})
				}
			}
		}
		return qualitiesArray
	}

	const transformData = (data) => {
		return data.map((qual) => ({ label: qual.name, value: qual._id }))
	}

	useEffect(() => {
		setIsLoading(true)
		api.users
			.getById(params.userID)
			.then(({ profession, qualities, ...data }) =>
				setData((prev) => ({
					...prev,
					...data,
					qualities: transformData(qualities),
					profession: profession._id,
				}))
			)
		api.professions.fetchAll().then((data) => {
			const professionsList = Object.keys(data).map((professionName) => ({
				label: data[professionName].name,
				value: data[professionName]._id,
			}))
			setProfession(professionsList)
		})
		api.qualities.fetchAll().then((data) => {
			const qualitiesList = Object.keys(data).map((optionName) => ({
				value: data[optionName]._id,
				label: data[optionName].name,
				color: data[optionName].color,
			}))
			setQualities(qualitiesList)
		})
	}, [])

	useEffect(() => {
		if (data._id) setIsLoading(false)
	}, [data])

	const handleChange = (target) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { profession, qualities } = data
		api.users
			.update(params.userID, {
				...data,
				profession: getProfessionById(profession),
				qualities: getQualitiesById(qualities),
			})
			.then(() => history.push(`/users/${params.userID}`))
	}
	console.log(data.profession)
	return (
		<form onSubmit={handleSubmit}>
			{!isLoading ? (
				<>
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
						value={data.profession}
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
				</>
			) : (
				''
			)}
		</form>
	)
}

export default EditUserPage
