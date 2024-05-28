import { useSelector } from "react-redux"
import { selectAuth } from "../../redux/auth/authSlice"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"

export default function AuthrozationRoute({
    roles, component: ComponentParams
}) {
    const {
        user: {role}
    } = useSelector(selectAuth)
    const navigate = useNavigate()
    const [page, setPage] = useState(null)

    useEffect(() => {
        if(!roles.includes(role)){
            navigate(-1)
        }else{
            setPage(<ComponentParams/>)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ComponentParams])

    return page
}

AuthrozationRoute.propTypes = {
    roles: PropTypes.array,
    component: PropTypes.any
}