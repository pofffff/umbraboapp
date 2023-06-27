import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from './Auth.Context'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { getApolloClient } from 'services/apollo'

export const AppProvider: React.FunctionComponent = ({ children }) => {
    const client = getApolloClient()

    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <NativeBaseProvider>
                    <SafeAreaProvider>{children}</SafeAreaProvider>
                </NativeBaseProvider>
            </AuthProvider>
        </ApolloProvider>
    )
}
