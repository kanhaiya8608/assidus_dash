import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Layout from './components/shared/Layout'
function App() {

  return (
<Router>
<Routes>
  <Route path="/" element={<Layout/>}>

    <Route index element={<Dashboard />} />
  </Route>
</Routes>
</Router>
  )
}

export default App