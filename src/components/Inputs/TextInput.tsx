import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    register: any
}

const TextInput = ({ error, register, ...props }: InputProps) => {
    const inputClassName = `form-control ${error && 'is-invalid'}`
    const feedbackId = props.name + '-error-feedback'

    return (
        <>
            <input type={props.type} className={inputClassName} placeholder={props.placeholder} {...props} {...register(props.name)} />

            {error && (
                <div id={feedbackId} className="invalid-feedback">
                    {error}
                </div>
            )}
        </>
    )
}

export default TextInput
