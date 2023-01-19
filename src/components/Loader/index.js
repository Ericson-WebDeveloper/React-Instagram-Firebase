
import React from 'react';
import {Grid} from 'react-loader-spinner'
const index = () => {
  return (
    <div style={{ "opacity": "0.5", "background": "#9e9e9e", "width": "100%", "height": "100%","zIndex":"10","top":"0","left": "0","position":"fixed",  }}>
        <div style={{ marginTop: "20%", marginLeft: "50%"}}>
            <Grid height={100} width={100} color="red" ariaLabel="Loading"  />
        </div>
        
    </div>
  )
}

export default index