import { Activity, Category, CreateTimeRecordInput } from '../types'
import {
  Headline,
  IconButton,
  InputDate,
  InputNumber,
  RegularText,
  TextButton
} from './_elements'
import { memo, useEffect, useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { USER_ID_KEY, colors, font, fontSize, spacing } from '../variables'

import { nullFilter } from '../utils'
import { ActivityDetailsBox } from './ActivityDetailsBox'
import { Icon } from './_icons'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context'
import { useSecureStore, useTimeRecord } from '../hooks'
import { CATEGORY_COLLECTION } from '../services/api'
import { ScreenLayout, FormLayout } from './_layouts'

interface CategoryContainerProps {
  category: Category
}

export const CategoryContainer: React.FC<CategoryContainerProps> = memo(
  ({ category }) => {
    const [categoryVisible, setCategoryVisible] = useState<boolean>(false)
    const [visibleId, setVisibleId] = useState<string | null>()
    const { getValue } = useSecureStore()
    const { userId } = useAuth()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const {
      CreateTimeRecordMutation,
      createTimeRecordData,
      createTimeRecordError
    } = useTimeRecord()
    const toggleActivity = (activity: Activity) => {
      console.log(activity)
      if (visibleId === activity.id) {
        setVisibleId(null)
      } else {
        setVisibleId(activity.id)
      }
    }

    const {
      control,
      getFieldState,
      handleSubmit,
      getValues,
      setValue,
      formState: {}
    } = useForm<CreateTimeRecordInput>({
      defaultValues: {
        amount: undefined,
        date: new Date(),
        activityId: ''
      },
      mode: 'onChange'
    })

    const handleSetDate = (date: Date) => {
      setValue('date', date)
    }

    const onSubmit = async (data: CreateTimeRecordInput) => {
      const { amount, date } = data
      if (!amount || !visibleId) return
      CreateTimeRecordMutation({
        variables: {
          userId: await getValue(USER_ID_KEY),
          input: { activityId: visibleId, amount: Number(amount), date }
        },
        refetchQueries: [
          {
            query: CATEGORY_COLLECTION,
            variables: { userId }
          }
        ]
      })
    }

    useEffect(() => {
      if (createTimeRecordData) {
        setModalVisible(false)
      }

      // TODO fix error handling
      if (createTimeRecordError) {
        console.error(createTimeRecordError)
      }
    }, [createTimeRecordData, createTimeRecordError])

    return (
      category && (
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
                <Headline text={'Add time record'} type={'$m'} />
                <InputNumber
                  label={'Amount'}
                  name={'amount'}
                  control={control}
                  getFieldState={getFieldState}
                  rules={{
                    required: true
                  }}
                />
                <InputDate
                  date={getValues('date')?.toDateString()}
                  label={'Date'}
                  handleSetDate={handleSetDate}
                />
                <TextButton
                  text={'Add'}
                  onPress={handleSubmit(onSubmit)}
                  primary
                />
              </FormLayout>
            </ScreenLayout>
          </Modal>
          <TouchableOpacity
            onPress={() => setCategoryVisible(!categoryVisible)}>
            <View style={styles.category}>
              <RegularText text={category.title} style={styles.categoryTitle} />
            </View>
            {categoryVisible &&
              category.activities &&
              category.activities
                .filter(nullFilter)
                .map((activity: Activity) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => toggleActivity(activity)}
                        key={`Activity-${activity.id}`}>
                        <View
                          style={[
                            styles.activity,
                            visibleId === activity.id && styles.activityActive
                          ]}>
                          <RegularText
                            text={activity.label}
                            style={styles.activityLabel}
                          />
                          <IconButton onPress={() => setModalVisible(true)}>
                            <RegularText
                              style={styles.activityLabel}
                              text={activity.totalTimeTraced.toString()}
                            />
                            <Icon name={'clock-time-four'} size={16} />
                          </IconButton>
                        </View>
                      </TouchableOpacity>
                      {activity.id === visibleId && (
                        <View style={styles.activityDetails}>
                          <ActivityDetailsBox activity={activity} />
                        </View>
                      )}
                    </>
                  )
                })}
          </TouchableOpacity>
        </View>
      )
    )
  }
)

const styles = StyleSheet.create({
  container: {
    // height: 'auto'
  },
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
    borderWidth: 1,
    // flex: 1,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.$xs
  },
  activityActive: {
    backgroundColor: colors.$grey
  },
  activityLabel: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$black,
    padding: spacing.$xs
  },
  activityDetails: {
    // flex: 1
    height: 50
  },
  closeIcon: {
    margin: spacing.$l
  }
})
