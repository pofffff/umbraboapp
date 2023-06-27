import { useEffect, useState } from 'react'

import { Modal, StyleSheet, View } from 'react-native'
import { USER_ID_KEY, colors, spacing } from '../variables'
import { useCategory, useSecureStore } from '../hooks'

import { CATEGORY_COLLECTION } from '../services/api'
import { CreateCategoryInput } from '../types'
import { useAuth } from '../context'
import { useForm } from 'react-hook-form'
import { Headline, IconButton, InputText, TextButton } from './_elements'
import { ScreenLayout, FormLayout } from './_layouts'
import { Icon } from './_icons'

export const CreateCategory: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { getValue } = useSecureStore()
  const { userId } = useAuth()
  const { CreateCategoryMutation, createCategoryData, createCategoryError } =
    useCategory()

  const {
    control,
    getFieldState,
    handleSubmit,
    formState: {}
  } = useForm<CreateCategoryInput>({
    defaultValues: {
      title: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (data: CreateCategoryInput) => {
    const { title } = data

    if (title) {
      CreateCategoryMutation({
        variables: {
          userId: await getValue(USER_ID_KEY),
          input: { title: title }
        },
        refetchQueries: [
          {
            query: CATEGORY_COLLECTION,
            variables: { userId: userId }
          }
        ]
      })
    }
  }

  useEffect(() => {
    if (createCategoryData) {
      setModalVisible(false)
    }
    if (createCategoryError) {
      // TODO Error component stuff
      console.error('Error add category')
    }
  }, [createCategoryData, createCategoryError])

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.closeIcon}>
          <IconButton onPress={() => setModalVisible(false)}>
            <Icon name={'close'} />
          </IconButton>
        </View>
        <ScreenLayout>
          <FormLayout>
            <Headline text={'Create category'} type={'$xl'} />
            <InputText
              label={'Title'}
              name={'title'}
              control={control}
              getFieldState={getFieldState}
              rules={{
                required: true
              }}
              keyboardType={undefined}
            />
            <TextButton text={'Add'} onPress={handleSubmit(onSubmit)} primary />
          </FormLayout>
        </ScreenLayout>
      </Modal>

      <TextButton text={'+ Category'} onPress={() => setModalVisible(true)} />
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
