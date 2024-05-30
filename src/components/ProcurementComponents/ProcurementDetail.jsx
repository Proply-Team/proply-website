import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProcurementAction,
  getProcurementByIdAction,
} from "../../redux/procurementSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";

export default function ProcurementDetail() {
  const { proc, isLoading } = useSelector((state) => state.procurement);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProcurementByIdAction(id));
    dispatch(getProcurementAction());
  }, [id]);

  if (isLoading || !proc) {
    return null;
  }

  console.log(proc);

  const formatDate = new Date(proc?.createdAt ?? Date.now());
  const date = formatDate.toLocaleDateString();

  return (
    <div className="d-flex flex-column gap-4 m-4">
      <Link to="/procurements">
        <button className="btn btn-info fw-semibold">
          <IconX size={22} className="me-2 pb-1" />
          Back
        </button>
      </Link>
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
                      <td>{approv.status}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          {approv.userResponse.userCredentialResponse.email ==
                          user.email ? (
                            <>
                              {proc.approvalResponses[idx - 1] &&
                              ["PENDING", "REJECTED", "CANCEL"].includes(
                                proc.approvalResponses[idx].status
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
                                  <button
                                    type="button"
                                    className="btn btn-danger fw-bold d-flex align-items-center"
                                  >
                                    <IconX size={22} color="white" />
                                    <span className="text-white">Reject</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success fw-bold d-flex align-items-center"
                                  >
                                    <IconCheck size={22} color="white" />
                                    <span className="text-white">Approve</span>
                                  </button>
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
  );
}
