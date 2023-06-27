import { Activity, Category } from 'types'
import { ActivityDetailsBox, RegularText } from 'components'
import { memo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, font, fontSize, spacing } from 'variables'

import { nullFilter } from 'utils'

interface CategoryContainerProps {
  category: Category
}

export const CategoryContainer: React.FC<CategoryContainerProps> = memo(
  ({ category }) => {
    const [categoryVisible, setCategoryVisible] = useState<boolean>(false)
    const [visibleActivity, setVisibleActivity] = useState<Activity | null>()

    console.log(category)
    return !category ? null : (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setCategoryVisible(!categoryVisible)}>
          <View style={styles.category}>
            <RegularText text={category.title} style={styles.categoryTitle} />
          </View>
          {categoryVisible &&
            category.activities &&
            category.activities.filter<Activity>(nullFilter).map(activity => {
              return (
                <TouchableOpacity
                  onPress={() => setVisibleActivity(activity)}
                  key={`Activity-${activity.id}`}>
                  <View
                    style={[
                      styles.activity,
                      visibleActivity?.id === activity.id
                        ? styles.activityActive
                        : null
                    ]}>
                    <RegularText
                      text={activity.label}
                      style={styles.activityLabel}
                    />
                  </View>
                  {visibleActivity && activity.id === visibleActivity.id && (
                    <ActivityDetailsBox
                      startDate={activity.startDate}
                      endDate={activity.endDate!}
                      totalTimeTraced={activity.totalTimeTraced}
                    />
                  )}
                </TouchableOpacity>
              )
            })}
        </TouchableOpacity>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {},
  category: {
    backgroundColor: colors.$black,
    borderBottomColor: colors.$light,
    borderBottomWidth: 1,
    color: colors.$light,
    height: 46
  },
  categoryTitle: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$light,
    paddingHorizontal: spacing.$xs,
    textAlignVertical: 'center',
    height: 46
  },
  activity: {
    borderColor: colors.$black,
    borderWidth: 1
  },
  activityActive: {
    backgroundColor: colors.$grey
  },
  activityLabel: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$black,
    padding: spacing.$xs
  }
})
