import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { StudentType } from '../../types'
import { Api } from '../../services'
import { useTitle } from '../../hooks'

const Home = () => {
    useTitle('Home | Brintell Desafio')
    const navigate = useNavigate()

    const [students, setStudents] = useState<StudentType[]>([])

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getStudents = async () => {
            try {
                const response = await Api.get('students', {
                    signal: controller.signal
                })
                isMounted && setStudents(response.data)
            } catch (_) {}
        }

        getStudents().then()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const deleteStudent = async (id: number): Promise<string | boolean> => {
        return Api.delete(`students/${id}`)
            .then((_) => {
                setStudents(students.filter((student) => student.id !== id))
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const handleDeleteDeleteStudent = async (id: number) => {
        const result = await deleteStudent(id)

        if (typeof result === 'string') {
            toast.error(result)
            return
        }

        toast.success('Aluno removido com sucesso!')
    }

    function getGender(gender: string): string {
        switch (gender) {
            case 'male':
                return 'Masculino'
            case 'female':
                return 'Feminino'
            case 'other':
                return 'Outro'
            default:
                return 'Outro'
        }
    }

    return (
        <div className="">
            <h1>Lista dos alunos</h1>

            <div className="mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <div></div>
                    <div>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/students/create')}>
                            Novo aluno
                        </button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '5%' }}>
                                    #
                                </th>
                                <th scope="col" style={{ width: '20%' }}>
                                    Nome
                                </th>
                                <th scope="col" style={{ width: '20%' }}>
                                    Cpf
                                </th>
                                <th scope="col" style={{ width: '20%' }}>
                                    E-mail
                                </th>
                                <th scope="col" style={{ width: '10%' }}>
                                    Sexo
                                </th>
                                <th scope="col" style={{ width: '15%' }}>
                                    Telefone
                                </th>
                                <th scope="col" style={{ width: '10%' }}>
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student.name}</td>
                                        <td>{student.cpf}</td>
                                        <td>{student.email}</td>
                                        <td>{getGender(student.gender)}</td>
                                        <td>{student.phoneNumber}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDeleteDeleteStudent(student.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="h4 text-center py-5">
                                        A lista dos alunos está vazia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home
