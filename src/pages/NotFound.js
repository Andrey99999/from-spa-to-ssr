import React from 'react'

const NotFound = () => {
    return(
        <div>
            <h1>Page Not Found</h1>  
        </div>
    ) 
}
//  for spa
// export default NotFound;

// for  server  side  rendering
export default { component: NotFound } 