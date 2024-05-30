/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function ProcurementApproval({
    id, 
    users, 
    divisions,
    onAddApprovalData,
}) {
    const [isSet, setIsSet] = useState(false)
    
    const {
        register,
        watch,
        getValues
    } = useForm({
        defaultValues: {
            userId: '',
            divisionId: ''
        }
    })


    const onSubmit = () => {
        const data = getValues()
        
        console.log(data)
        setIsSet(true)
        onAddApprovalData(data)
    }

    return (
        <form className='mb-2'>
            <div className="row">
                <div className="col">
                    <label htmlFor={`division-${id}`} className="form-label">Division</label>
                    <select disabled={isSet} {...register('divisionId')} id={`division-${id}`} className="form-select">
                        <option value="">--Select Division--</option>
                        {divisions.map((val, idx) => (
                            <option key={idx} value={val.divisionId}>{val.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor={`users-${id}`} className="form-label">Division</label>
                    <select disabled={isSet} {...register('userId')} id={`users-${id}`} className="form-select">
                        <option value="">--Select Users--</option>
                        {users.filter(val => val.divisionResponse.divisionId == watch('divisionId')).map((val, idx) => (
                            <option key={idx} value={val.userId}>{val.fullName}</option>
                        ))}
                    </select>
                </div>
                <div className="col align-self-end">
                    <button type='button' onClick={() =>onSubmit()} disabled={isSet} className="btn btn-primary me-2">Save</button>
                </div>
            </div>
        </form>
    )
}

export default ProcurementApproval