import { Category, CategoryCollectionResult } from 'types'
import {
    CategoryContainer,
    CreateActivity,
    CreateCategory,
    Headline,
    ScreenLayout
} from 'components'
import { StyleSheet, View } from 'react-native'

import { CATEGORY_COLLECTION } from 'services/api'
import { FC } from 'react'
import { nullFilter } from 'utils'
import { useAuth } from 'context'
import { useQuery } from '@apollo/client'

interface ActivitiesScreenProps {}

export const ArchiveScreen: FC<ActivitiesScreenProps> = ({}) => {
    const { userId } = useAuth()
    const { loading, error, data } = useQuery<CategoryCollectionResult>(
        CATEGORY_COLLECTION,
        {
            variables: { userId }
        }
    )

    return (
        <ScreenLayout>
            <Headline type={'$xl'} text={'Activities'} />
            {data?.categoryCollection.categories && (
                <View style={styles.categoryList}>
                    {data?.categoryCollection?.categories?.length > 0 &&
                        data.categoryCollection.categories
                            .filter<Category>(nullFilter)
                            .map((category) => {
                                return (
                                    <CategoryContainer
                                        category={category}
                                        key={`Category-${category.id}`}
                                    />
                                )
                            })}
                </View>
            )}

            <View style={styles.actionsWrapper}>
                <CreateCategory />
                <CreateActivity />
            </View>
        </ScreenLayout>
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