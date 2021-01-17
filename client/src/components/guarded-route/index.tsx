import React, { FC, WeakValidationMap } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLikelyAuthorized } from '../../helpers'

type GuardedRouteProps = {
  component: FC<WeakValidationMap<unknown> | undefined>
  path: string
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLikelyAuthorized() ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  )
}

export { GuardedRoute }
