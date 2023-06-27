import {
  CATEGORIES,
  CATEGORY_COLLECTION,
  CREATE_ACTIVITY
} from '../services/api'
import {
  Category,
  CategoryCollectionResult,
  CreateActivityInput,
  QueryCategoryCollectionArgs
} from '../types'
import { useEffect, useState } from 'react'

import { Modal, StyleSheet, View } from 'react-native'
import { USER_ID_KEY, colors, spacing } from '../variables'
import { useLazyQuery, useMutation } from '@apollo/client'

import { useAuth } from '../context'
import { useForm } from 'react-hook-form'
import { useSecureStore } from '../hooks'
import { Icon } from './_icons'
import {
  Headline,
  IconButton,
  InputDate,
  InputSelect,
  InputText,
  TextButton
} from './_elements'
import { ScreenLayout, FormLayout } from './_layouts'

export const CreateActivity: React.FC = () => {
  const { getValue } = useSecureStore()
  const { userId } = useAuth()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [CreateActivityMutation, { data, error }] = useMutation(CREATE_ACTIVITY)
  const [
    getCategories,
    { data: categoryData, loading: categoryLoading, error: categoryError }
  ] = useLazyQuery<CategoryCollectionResult, QueryCategoryCollectionArgs>(
    CATEGORIES
  )

  const {
    control,
    getFieldState,
    getValues,
    setValue,
    handleSubmit,
    formState: {}
  } = useForm<CreateActivityInput>({
    defaultValues: {
      label: '',
      startDate: undefined,
      categoryId: ''
    },
    mode: 'onChange'
  })

  const handleSetDate = (date: Date) => {
    setValue('startDate', date)
  }

  const onSubmit = async (idata: CreateActivityInput) => {
    const { label, categoryId, startDate } = idata
    if (!label || !categoryId) return
    CreateActivityMutation({
      variables: {
        userId: await getValue(USER_ID_KEY),
        input: {
          label,
          categoryId,
          startDate: startDate ? startDate : new Date()
        }
      },
      refetchQueries: [
        {
          query: CATEGORY_COLLECTION,
          variables: { userId: userId }
        }
      ]
      // TODO Refactor refetch whole collection everytime
      // update(cache, { data }) {
      //     console.log(cache)
      //     console.log(data.createChore)
      //     if (!data) {
      //         return
      //     }

      //     cache.modify({
      //         id: cache.identify(makeReference('ROOT_QUERY')),
      //         fields: {
      //             categoryCollection: (previous, { toReference }) => {
      //                 const cat = previous.find(())
      //                 return [...previous, data.createChore]
      //             }
      //         }
      //     })
      // }
    })
  }

  useEffect(() => {
    // TODO Should be possible to use useQuery instead of lazy
    if (userId) {
      getCategories({
        variables: { userId }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    if (data) {
      setModalVisible(false)
    }
  }, [data, error])

  return !categoryData?.categoryCollection ? null : (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.closeIcon}>
          <IconButton onPress={() => setModalVisible(true)}>
            <Icon name={'close'} />
          </IconButton>
        </View>
        <ScreenLayout>
          <FormLayout>
            <Headline text={'Create activity'} type={'$xl'} />
            <InputText
              label={'Label'}
              name={'label'}
              control={control}
              getFieldState={getFieldState}
              rules={{
                required: true
              }}
              keyboardType={undefined}
            />
            <InputSelect
              label={'Category'}
              name={'categoryId'}
              control={control}
              getFieldState={getFieldState}
              items={categoryData.categoryCollection.categories as Category[]}
            />
            <InputDate
              date={getValues('startDate')?.toDateString()}
              label={'Start date'}
              handleSetDate={handleSetDate}
            />
            <TextButton
              text={'Create'}
              onPress={handleSubmit(onSubmit)}
              primary
            />
          </FormLayout>
        </ScreenLayout>
      </Modal>
      <TextButton text={'+ Activity'} onPress={() => setModalVisible(true)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { margin: spacing.$xs },
  form: {
    backgroundColor: colors.$plainWhite,
    padding: spacing.$xl,
    flex: 1,
    flexDirection: 'column'
  },
  closeIcon: {
    margin: spacing.$l
  }
})
