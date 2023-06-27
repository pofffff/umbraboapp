import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export const ScrollLayout: React.FunctionComponent = ({ children }) => {
    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={[styles.scrollView]}
            >
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        height: '100%'
    }
})
