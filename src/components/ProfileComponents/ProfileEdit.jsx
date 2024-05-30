import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { putUserAction, selectUser } from "../../redux/userSlice";
import Loading from "../../animation/Loading";
import { useEffect } from "react";
import { getDivisionAction } from "../../redux/divisionSlice";
import moment from "moment";

const schema = z.object({
  fullName: z.string().min(1, "Name is required"),
});

const ProfileEdit = () => {
  const { current, isLoading } = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { divs } = useSelector((state) => state.division);
  const [selectedDate, setSelectedDate] = useState(
    parseDate(current.birthDate)
  );
  const [maritalStatus, setMaritalStatus] = useState(current.maritalStatus);
  const [gender, setGender] = useState(current.gender);
  const [division, setDivision] = useState([
    current.divisionResponse.divisionId,
    current.divisionResponse.name,
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: current.fullName,
      email: current.userCredentialResponse.email,
      // password:current.password,
      birthDate: parseDate(current.birthDate),
      gender: current.gender,
      maritalStatus: current.maritalStatus,
      divisionId: division,
    },
    resolver: zodResolver(schema),
  });

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  function parseDate(ms) {
    const date = new Date(ms);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    dispatch(getDivisionAction());
    if (current) {
      reset();
    }
  }, [current, dispatch]);

  const onSubmit = async (data) => {
    try {
      const registerInputs = {
        ...data,
        id: current.userId,
        birthDate: moment(selectedDate, "YYYY-MM-DD").valueOf(),
        gender: gender,
        maritalStatus: maritalStatus,
        divisionId: division[0],
        email: current.userCredentialResponse.email,
        profileImage: current.profileImageUrl,
      };
      console.log(registerInputs);
      await dispatch(putUserAction(registerInputs));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (!current) {
    return <div>Error: Unable to fetch user data</div>;
  }

  return (
    <div className="d-flex flex-column w-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-sm p-4 rounded-2 bg-white"
      >
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input
            {...register("fullName")}
            className={`bg-light form-control rounded-3 border-0 border-bottom ${
              errors.fullName && "is-invalid"
            }`}
            type="text"
            name="fullName"
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-2">
          <label className="form-label">Birth Date</label>
          <input
            className="bg-light form-control rounded-3 border-0 border-bottom"
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{ width: 200 }}
          />
          {/* {selectedDate && <p>{formatDate(selectedDate)}</p>} */}
        </div>
        {/* <div className="mb-2">
      <label className="form-label">Phone Number</label>
      <input {...register("mobilePhone")} className={`bg-light form-control rounded-3 border-0 border-bottom ${errors.mobilePhone && "is-invalid"}`} type="text" name="mobilePhone" />
      {errors.mobilePhone && <div className="invalid-feedback">{errors.mobilePhone.message}</div>}
    </div> */}
        <div className="mb-2">
          <label className="form-label">Gender</label>
          <div className="dropdown">
            <button
              className="btn btn-info dropdown-toggle px-4 fw-semibold "
              type="button"
              id="gender"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {gender}
            </button>
            <div className="dropdown-menu" aria-labelledby="gender">
              <a className="dropdown-item" onClick={() => setGender("FEMALE")}>
                FEMALE
              </a>
              <a className="dropdown-item" onClick={() => setGender("MALE")}>
                MALE
              </a>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Status</label>
          <div className="dropdown">
            <button
              className="btn btn-info dropdown-toggle px-4 fw-semibold"
              type="button"
              id="maritalStatus"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {maritalStatus}
            </button>
            <div className="dropdown-menu" aria-labelledby="maritalStatus">
              <a
                className="dropdown-item"
                onClick={() => setMaritalStatus("MARRIED")}
              >
                MARRIED
              </a>
              <a
                className="dropdown-item"
                onClick={() => setMaritalStatus("SINGLE")}
              >
                SINGLE
              </a>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Division</label>
          <div className="dropdown">
            <button
              className="btn btn-info dropdown-toggle px-4 fw-semibold"
              type="button"
              id="division"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {division[1]}
            </button>
            <div className="dropdown-menu" aria-labelledby="division">
              {divs.map((div) => {
                return (
                  <a
                    key={div.divisionId}
                    className="dropdown-item"
                    onClick={() => setDivision([div.divisionId, div.name])}
                  >
                    {div.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input
            {...register("email")}
            className={`bg-light form-control rounded-3 border-0 border-bottom ${
              errors.email && "is-invalid"
            }`}
            disabled={true}
            type="email"
            name="email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="d-flex gap-2 mt-4">
          <button
            className="btn btn-secondary px-5 d-flex align-items-center gap-2 fw-semibold "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
