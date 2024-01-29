import React from 'react'
import { CircularProgress } from "@mui/material";
import '../style/Loader.css'
function Loader() {
  return (
   <>
   <div className="loader" >
   
   <CircularProgress  />
    </div>
   </>
  )
}

export default Loader