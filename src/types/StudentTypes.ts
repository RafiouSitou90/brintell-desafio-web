export type StudentType = {
    id: number
    name: string
    email: string
    cpf: string
    gender: string
    phoneNumber: number
    createdAt: number
    updatedAt: number
}

export type StudentCreationType = {
    name: string
    email: string
    cpf: string
    gender: string
    phoneNumber: number
}

export type StudentStatistics = {
    totalMale: number
    totalOther: number
    totalFemale: number
    totalUnknown: number
    totalStudent: number
}
