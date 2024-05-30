import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProcurementAction,
  getProcurementByIdAction,
  putApprovalAction,
  putCancelAction,
  putRejectAction,
} from "../../redux/procurementSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import ProcurementRejectModal from "./ProcurementRejectModal";

export default function ProcurementDetail() {
  const { proc, isLoading } = useSelector((state) => state.procurement);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [show, setShow] = useState(false)

  const handleClose = () => {
      setShow(false)
  }

  useEffect(() => {
    dispatch(getProcurementByIdAction(id));
    dispatch(getProcurementAction());
  }, [id, dispatch]);

  const onApprove = async (payload) => {
    await dispatch(putApprovalAction(payload))
  }

  const onReject = async (payload) => {
    await dispatch(putRejectAction(payload))
  }

  const onCancel = async (payload) => {
    await dispatch(putCancelAction(payload))
  }

  if (isLoading || !proc) {
    return null;
  }

  console.log(proc);


  const formatDate = new Date(proc?.createdAt ?? Date.now());
  const date = formatDate.toLocaleDateString();

  return (
    <>
      <ProcurementRejectModal proc={proc} show={show} handleClose={handleClose} onReject={onReject}/>
      <div className="d-flex flex-column gap-4 m-4">
        <div className="d-flex justify-content-between">
          <Link to="/procurements">
            <button className="btn btn-info fw-semibold">
              <IconX size={22} className="me-2 pb-1" />
              Back
            </button>
          </Link>
          {user.email == proc.userResponse.userCredentialResponse.email && (
            <button
             onClick={() => onCancel({
              procurementId: proc.procurementId
             })}
             className="btn btn-danger text-white fw-bold">Cancel Req</button>
          )}
        </div>
        <h4>Procurement Details</h4>
        <div className="d-flex flex-column">
          <p>
            Procurement ID: <b>{proc.procurementId}</b>
          </p>
          <p>
            Procurement Category: <b>{proc.procurementCategoryResponse.name}</b>
          </p>
          <p>
            Requested At: <b>{date}</b>
          </p>
          <p>
            Requested By: <b>{proc.userResponse.fullName}</b>
          </p>
          <p>Items:</p>
        </div>
        <div className="d-flex flex-column table-responsive gap-4">
          <table className="table text-center ">
            <thead>
              <tr>
                <td>No</td>
                <td>Item</td>
                <td>Item Category</td>
                <td>Quantity</td>
              </tr>
            </thead>
            <tbody>
              {proc.procurementDetailResponses ? (
                proc.procurementDetailResponses.map((procurementDetail, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{++idx}</td>
                      <td className="fw-semibold">
                        {procurementDetail.itemResponse?.name ?? "Money"}
                      </td>
                      <td>
                        {procurementDetail.itemResponse?.itemCategoryResponse
                          ?.name ?? "Money"}
                      </td>
                      <td>{procurementDetail.quantity}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>Items not found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="">
          <p>Approval By:</p>
          <div className="d-flex flex-column table-responsive gap-4">
            <table className="table text-center ">
              <thead>
                <tr>
                  <td>No</td>
                  <td>Name</td>
                  <td>Status</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {proc.approvalResponses ? (
                  proc.approvalResponses.map((approv, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td className="fw-semibold">
                          {approv.userResponse.fullName}
                        </td>
                        <td>
                          <span className={`badge ${approv.status == "PENDING" ? "bg-secondary" : approv.status == "APPROVED" ? "bg-success" : approv.status == "CANCELED" ? "bg-warning" : "bg-danger"}`}>
                            {approv.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            {approv.userResponse.userCredentialResponse.email ==
                            user.email ? (
                              <>
                                {proc.approvalResponses[idx - 1] &&
                                ["PENDING", "REJECTED", "CANCEL"].includes(
                                  proc.approvalResponses[idx - 1].status
                                ) ? (
                                  <>
                                      {["PENDING"].includes(
                                          proc.approvalResponses[idx].status
                                      ) && (
                                          <button className="btn btn-secondary">
                                              Waiting
                                          </button>
                                      )}
                                  </>
                                ) : (
                                  <>
                                  {approv.status == "PENDING" && (
                                    <>
                                      <button
                                        onClick={() => setShow(true)}
                                        type="button"
                                        className="btn btn-danger fw-bold d-flex align-items-center"
                                      >
                                        <IconX size={22} color="white" />
                                        <span className="text-white">Reject</span>
                                      </button>
                                      <button
                                        onClick={() => onApprove({
                                          procurementId: proc.procurementId
                                        })}
                                        type="button"
                                        className="btn btn-success fw-bold d-flex align-items-center"
                                      >
                                        <IconCheck size={22} color="white" />
                                        <span className="text-white">Approve</span>
                                      </button>
                                    </>
                                  )}
                                  </>
                                )}
                              </>
                            ) : (
                              <span></span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>Approved not found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
