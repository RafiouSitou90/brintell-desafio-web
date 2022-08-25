import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { toast } from 'react-toastify'

import { StudentCreationType } from '../../types'
import { useTitle } from '../../hooks'
import { Select, SelectOptionType, TextInput } from '../../components'
import { Api } from '../../services'

const GENDER: SelectOptionType[] = [
    {
        id: 'male',
        name: 'Masculino'
    },
    {
        id: 'female',
        name: 'Feminino'
    },
    {
        id: 'other',
        name: 'Outro'
    }
]

const VALID_CPF = new RegExp('(^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$)|(^\\d{11})')

const studentCreationSchema = Yup.object({
    name: Yup.string().trim().min(3).required(),
    email: Yup.string().email().trim().required(),
    cpf: Yup.string().trim().min(11).matches(VALID_CPF, 'CPF invalido! exemplo: 000.000.000-00 ou 12345678900').required(),
    gender: Yup.string().required(),
    phoneNumber: Yup.string().required()
}).required()

const CreateStudent = () => {
    useTitle('Student creation | Brintell Desafio')
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { isSubmitting, errors }
    } = useForm<StudentCreationType>({
        mode: 'onTouched',
        resolver: yupResolver(studentCreationSchema)
    })

    const handleCreateStudent = async (student: StudentCreationType): Promise<string | boolean> => {
        return Api.post('students', student)
            .then((_) => {
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const onSubmit = async (student: StudentCreationType) => {
        const result = await handleCreateStudent(student)

        if (typeof result === 'string') {
            toast.error(result)
            return
        }

        toast.success('Aluno criado com sucesso')
        navigate('/')
    }

    return (
        <div>
            <h1>Adiciona novo aluno</h1>
            <div className="card card-primary card-outline mt-5">
                <div className="card-header">
                    <h3 className="card-title">Novo aluno</h3>

                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Nome</label>
                                        <TextInput id="name" name={'name'} type={'text'} placeholder={'Nome aluno'} register={register} error={errors.name && errors.name.message} />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="cpf">Cpf</label>
                                        <TextInput id="cpf" name={'cpf'} type={'text'} placeholder={'000.000.000-00'} register={register} error={errors.cpf && errors.cpf.message} />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="email">E-mail</label>
                                        <TextInput id="email" name={'email'} type={'email'} placeholder={'aluno@exemplo.com.br'} register={register} error={errors.email && errors.email.message} />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="gender">Sexo</label>
                                        <Select register={register} name="gender" id="gender" options={GENDER} style={{ width: '100%' }} />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="phoneNumber">Telefone</label>
                                        <TextInput name={'phoneNumber'} type={'text'} placeholder={'Telefone'} register={register} error={errors.phoneNumber && errors.phoneNumber.message} />
                                    </div>

                                    <div className="row mt-5">
                                        <div className="col-6 my-3">
                                            <button
                                                type="reset"
                                                className="btn btn btn-secondary btn-lg"
                                                onClick={() => {
                                                    reset()
                                                    clearErrors()
                                                }}
                                            >
                                                Reset
                                            </button>
                                        </div>
                                        <div className="col-6 my-3">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg">
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                Validar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStudent
