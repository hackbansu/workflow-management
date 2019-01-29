import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../home'
import Default from '../default'

const App = () => (
  <div>
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Default} />
      </Switch>
    </main>
  </div>
)

export default App
