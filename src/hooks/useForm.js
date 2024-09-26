import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidated = []) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidatedState, setFormValidatedState] = useState({})

    useEffect(() => {
        validadorDelFormulario()
    }, [formState])

    useEffect(() => {
      setFormState(initialForm)
    }, [initialForm])



    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const validadorDelFormulario = () => {
        const valuesValidados = {}

        for (const fieldForm in formValidated) {
            const [fn, message] = formValidated[fieldForm]
            valuesValidados[`is${fieldForm}Valid`] = fn(formState[fieldForm]) ? null : message;
            setFormValidatedState(valuesValidados)
        }
    }

    const isFormValidated = useMemo(() => {
        const result = Object.values(formValidatedState).every(value => value === null)
        return result
    }, [formValidatedState])


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidatedState, formValidatedState, isFormValidated
    }
}