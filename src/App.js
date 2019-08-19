import React from 'react'
import { renderRoutes } from 'react-router-config'

import './App.scss'

const App = ({ route }) => {
    return <div>{ renderRoutes(route.routes) }</div>
}

App.defaultProps = {
    route: null
}

// for  spa
// export default App;

//for  server  side  rendering 
export default { component: App }