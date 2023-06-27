import { Category, CategoryCollectionResult } from '../types'
import {
  CategoryContainer,
  CreateActivity,
  CreateCategory,
  Headline
} from '../components'
import { StyleSheet, View } from 'react-native'

import { CATEGORY_COLLECTION } from '../services/api'
import { nullFilter } from '../utils'
import { useAuth } from '../context'
import { useQuery } from '@apollo/client'

interface ActivitiesScreenProps {}

export const ArchiveScreen: React.FC<ActivitiesScreenProps> = () => {
  const { userId } = useAuth()
  const { data } = useQuery<CategoryCollectionResult>(CATEGORY_COLLECTION, {
    variables: { userId }
  })

  const renderCategories = () => {
    if (data?.categoryCollection.categories) {
      return data.categoryCollection.categories
        .filter(nullFilter)
        .map((category: Category) => {
          return (
            <CategoryContainer
              category={category}
              key={`Category-${category.id}`}
            />
          )
        })
    }
  }

  return (
    <>
      <Headline type={'$xl'} text={'Activities'} />
      {data?.categoryCollection.categories && (
        <View style={styles.categoryList}>
          {data?.categoryCollection?.categories?.length > 0 &&
            renderCategories()}
        </View>
      )}

      <View style={styles.actionsWrapper}>
        <CreateCategory />
        <CreateActivity />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  actionsWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  categoryList: {
    flex: 1,
    height: 'auto'
  }
})
