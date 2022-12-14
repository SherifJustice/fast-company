/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
		licence: false,
	})
	const [qualities, setQualities] = useState({})
	const [professions, setProfession] = useState()
	const [errors, setErrors] = useState({})
	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfession(data))
		api.qualities.fetchAll().then((data) => setQualities(data))
	}, [])
	const handleChange = (target) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }))
	}

	const validatorConfig = {
		email: {
			isRequired: { message: 'Электронная почта обязательна для заполнения' },
			isEmail: { message: 'Электронная почта введена некорректно' },
		},
		password: {
			isRequired: { message: 'Пароль обязателен для заполнения' },
			isCapitalSymbol: {
				message: 'Пароль должен содержать хотя бы одну заглавную букву',
			},
			isContainDigit: {
				message: 'Пароль должен содержать хотя бы одну цифру',
			},
			min: {
				message: 'Пароль должен состоять минимум из 8 символов',
				value: 8,
			},
		},
		profession: {
			isRequired: { message: 'поле обязательно для заполнения' },
		},
		licence: {
			isRequired: {
				message:
					'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
			},
		},
	}

	useEffect(() => {
		validate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])
	const validate = () => {
		const errors = validator(data, validatorConfig)

		setErrors(errors)
		return Object.keys(errors).length === 0
	}
	const isValid = Object.keys(errors).length === 0

	const handleSubmit = (e) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
	}
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Электронная почта"
				name="email"
				value={data.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<TextField
				label="Пароль"
				type="password"
				name="password"
				value={data.password}
				onChange={handleChange}
				error={errors.password}
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
			<CheckBoxField
				value={data.licence}
				onChange={handleChange}
				name="licence"
				error={errors.licence}
			>
				Подтвердить <a>лицензионное соглашение</a>
			</CheckBoxField>

			<button
				type="submit"
				disabled={!isValid}
				className="btn btn-primary w-100 mx-auto"
			>
				Submit
			</button>
		</form>
	)
}

export default RegisterForm
