import { RegularText } from '../components'
import { IconButton } from './_elements'
import { Icon } from './_icons'
import { StyleSheet, View } from 'react-native'
import { colors, font, fontSize, spacing } from '../variables'

import { formatDateShort } from '../utils'

interface ActivityDetailsBoxProps {
  endDate?: Date
  startDate: Date
  totalTimeTraced: number
}

export const ActivityDetailsBox: React.FC<ActivityDetailsBoxProps> = ({
  endDate,
  startDate,
  totalTimeTraced
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View>
          <RegularText style={styles.label} text={'Started'} />
          <RegularText style={styles.text} text={formatDateShort(startDate)} />
        </View>
        <View style={styles.detailColumn}>
          <RegularText style={styles.label} text={'Finished'} />
          <RegularText
            style={styles.text}
            text={endDate ? formatDateShort(endDate) : '-'}
          />
        </View>
        <View>
          <RegularText style={styles.label} text={'Total'} />
          <RegularText
            style={styles.text}
            text={Math.ceil(totalTimeTraced).toString()}
          />
        </View>
      </View>
      <IconButton onPress={() => console.log('press')}>
        <Icon name={'plus'} />
      </IconButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.$black,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    padding: spacing.$xs
  },

  detailsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  detailColumn: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: spacing.$s
  },
  label: {
    fontFamily: font.$text__bold,
    fontSize: fontSize.$xs,
    paddingLeft: spacing.$xxs
  },

  text: {
    fontFamily: font.$text__light,
    fontSize: fontSize.$xs,
    paddingLeft: spacing.$xxs
  }
})
