import * as React from 'react'

import { StyleSheet, View } from 'react-native'
import { colors, spacing } from 'variables'

import { ScrollLayout } from './Scroll.Layout'

// interface ScreenLayoutProps

export const ScreenLayout: React.FunctionComponent = ({ children }) => {
    return (
        <View style={styles.screenLayout}>
            <ScrollLayout>{children}</ScrollLayout>
        </View>
    )
}

const styles = StyleSheet.create({
    screenLayout: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.$plainWhite,
        marginHorizontal: '12%',
        paddingVertical: spacing.$s
    }
})
