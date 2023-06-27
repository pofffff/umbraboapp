import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { JSXComponentProps } from '../../types'

import { spacing } from '../../variables'

interface IconButtonProps extends JSXComponentProps {
  alignRight?: boolean
  onPress(): void
  style?: any
}
export const IconButton: React.FC<IconButtonProps> = ({
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
        ]}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  alignRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: spacing.$l
  }
})
