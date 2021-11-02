import { ErrorMessage,useField } from 'formik'
import React from 'react'
import { forwardRef } from 'react'

const UserLogin = forwardRef((props,ref) => {
    return (
        <React.Fragment>
            <label className='label15'>{props.label}</label>
            <input ref={ref} {...props} />
        </React.Fragment>
    )
})

export default UserLogin
    