import {
  JSXComponentProps,
  QueryLoginUserArgs,
  QueryLoginUserPayload
} from '../types'
import React, { memo, useContext, useEffect, useMemo, useState } from 'react'
import { TOKEN_KEY, USER_ID_KEY } from '../variables'

import { SIGN_IN_USER } from '../services/api'
import { getApolloClient } from '../services/apollo'
import { useLazyQuery } from '@apollo/client'
import { useSecureStore } from '../hooks'

export interface AuthContextValue {
  signIn(email: string, password: string): void
  signOut(): void
  authenticated: boolean
  userId: string | undefined
}

export const defaultAuthContextValue: AuthContextValue = {
  signIn: (_email, _password) => {},
  signOut: async () => {},
  authenticated: false,
  userId: ''
}

export const AuthContext = React.createContext<AuthContextValue>(
  defaultAuthContextValue
)

export const AuthProvider = memo(({ children }: JSXComponentProps) => {
  const apolloClient = getApolloClient()
  const { deleteValue, setValue } = useSecureStore()
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | undefined>()

  const [signInQuery, { data, error }] = useLazyQuery<
    QueryLoginUserPayload,
    QueryLoginUserArgs
  >(SIGN_IN_USER)

  const signIn = (email: string, password: string) => {
    signInQuery({
      variables: {
        input: { email, password }
      }
    })
  }

  const signOut = async () => {
    await deleteValue(TOKEN_KEY)
    await apolloClient.resetStore()
  }

  useEffect(() => {
    if (data?.loginUser) {
      setValue(TOKEN_KEY, data.loginUser.token)
      setValue(USER_ID_KEY, data.loginUser.userId)
      setAuthenticated(true)
      setUserId(data.loginUser.userId)
    }

    if (error) console.error(error)
    // TODO: Display error from BE
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

  const memoedValue = useMemo(
    () => ({
      userId,
      authenticated,
      signIn,
      signOut
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId, authenticated]
  )

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  )
})

export const useAuth = () => useContext(AuthContext)
