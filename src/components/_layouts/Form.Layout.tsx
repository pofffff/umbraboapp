import * as React from 'react'

import { StyleSheet, View } from 'react-native'

export const FormLayout: React.FunctionComponent = ({ children }) => {
    return <View style={styles.layoutWrapper}>{children}</View>
}

export const styles = StyleSheet.create({
    layoutWrapper: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        marginVertical: 20
    }
})
