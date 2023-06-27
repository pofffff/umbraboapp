import { StyleSheet, View } from 'react-native'
import { colors, spacing } from 'variables'

import { ScrollLayout } from './Scroll.Layout'
import { JSXComponentProps } from 'types'

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
    marginHorizontal: '12%',
    paddingVertical: spacing.$s
  }
})
