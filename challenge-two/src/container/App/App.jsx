import '../../assets/sass/index.scss'

import React from 'react'
import Header from '../../components/Header/header'
import Main from '../Main/main'

const App = props => (
  <div className="container-fluid">
    <Header />
    <Main />
  </div>
)

export default App
