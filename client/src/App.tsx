import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GuardedRoute } from './components'
import './i18n'
import { Profile, Signin, Signup } from './pages'

const App: FC = () => {
  return (
    <main className='bg-blue-400 text-xl h-screen flex items-center justify-center'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <GuardedRoute path='/profile' component={Profile} />
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export { App }
