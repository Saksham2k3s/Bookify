import React from 'react'
import { Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
function AlertPage(props) {
  return (
    <>
    <Alert icon={<CheckIcon fontSize="inherit" />} severity={props.color}>
  {props.message}
</Alert>
    </>
  )
}

export default AlertPage