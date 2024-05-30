/* eslint-disable react/prop-types */
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as z from "zod"

export default function ProcurementRejectModal({
    show,
    proc,
    onReject,
    handleClose
}) {
    const schema = z.object({
        procurementId: z.string().min(1, "Procurement Id Required"),
        notes: z.string().nullable()
    })

    const {
        register,
        getValues
    } = useForm({
        defaultValues: {
            procurementId: proc.procurementId,
            notes: ''
        },
        resolver: zodResolver(schema)
    })

    const onSubmit = async () => {
        const data = getValues()
        console.log(data)
        await onReject(data)
        handleClose()
    }

    return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal Rejected Proc Req {proc.userResponse.fullName}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="procurementId" className="form-label">Procurement Id</label>
                        <input type="text" readOnly {...register('procurementId')} className="form-control" id="procurementId" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="notes" className="form-label">Notes</label>
                        <textarea {...register('notes')} className="form-control" id="notes"></textarea>
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <button type="button" onClick={() => onSubmit()} className="btn btn-primary text-white fw-bold">
                    Submit
                </button>
                <button type="button" onClick={() => handleClose()} className="btn btn-danger text-white fw-bold">
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    </>
    )
}
