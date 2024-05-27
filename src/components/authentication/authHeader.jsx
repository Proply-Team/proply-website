import React from 'react'

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user && user.data.token) {
        return {}
    }
  return (
    <div>authHeader</div>
  )
}

export default authHeader