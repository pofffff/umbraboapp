import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { FC } from 'react'
import { spacing } from 'variables'

interface IconButtonProps {
    alignRight?: boolean
    onPress(): void
    style?: any
}
export const IconButton: FC<IconButtonProps> = ({
    alignRight,
    onPress,
    children,
    style
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={[
                    styles.iconButtonContainer,
                    alignRight && styles.alignRight,
                    { ...style }
                ]}
            >
                {children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconButtonContainer: {
        flex: 1,
        flexDirection: 'column'
        // alignItems: 'center'
    },

    alignRight: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: spacing.$l
    }
})
