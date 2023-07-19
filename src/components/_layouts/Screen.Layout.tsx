import { StyleSheet, View } from 'react-native'
import { colors, spacing } from '../../variables'

import { JSXComponentProps } from '../../types'
import { ScrollLayout } from './Scroll.Layout'

interface ScreenLayoutProps extends JSXComponentProps {}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
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
    paddingHorizontal: '3%',
    paddingVertical: spacing.$xs
  }
})
