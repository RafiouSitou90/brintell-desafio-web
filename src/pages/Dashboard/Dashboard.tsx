import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

import { StudentStatistics } from '../../types'
import { Api } from '../../services'
import { useTitle } from '../../hooks'

Chart.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
    useTitle('Dashboard | Brintell Desafio')

    const [statistics, setStatistics] = useState<StudentStatistics>({
        totalMale: 0,
        totalStudent: 0,
        totalFemale: 0,
        totalOther: 0,
        totalUnknown: 0
    })

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getStudentsStatistics = async () => {
            try {
                const response = await Api.get('students/statistics', {
                    signal: controller.signal
                })
                isMounted && setStatistics(response.data)
                console.log({ stats: response.data })
            } catch (_) {}
        }

        getStudentsStatistics().then()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const statsData = {
        labels: ['Total Mulheres', 'Total Homens', 'Total Outros'],
        datasets: [
            {
                data: [statistics.totalFemale, statistics.totalMale, statistics.totalOther + statistics.totalUnknown],
                backgroundColor: ['rgba(255, 99, 132, 0.3)', 'rgba(54, 162, 235, 0.3)', 'rgba(255, 206, 86, 0.3)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 2
            }
        ]
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <div className="my-5 w-50 h-50 my-auto mx-auto">
                <Pie data={statsData} />
            </div>
        </div>
    )
}

export default Dashboard
