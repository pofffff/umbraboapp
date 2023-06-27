import { FormLayout, RegularText, ScreenLayout } from '../components'
import {
  Headline,
  IconButton,
  InputDate,
  InputText,
  TextButton
} from './_elements'
import { Icon } from './_icons'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { USER_ID_KEY, colors, font, fontSize, spacing } from '../variables'

import { formatDateShort } from '../utils'
import { Activity, CreateTimeRecordInput } from '../types'
import { useState } from 'react'
import { useSecureStore, useTimeRecord } from '../hooks'
import { useForm } from 'react-hook-form'
import { CATEGORY_COLLECTION } from '../services/api'
import { useAuth } from '../context'

interface ActivityDetailsBoxProps {
  activity: Activity
}

export const ActivityDetailsBox: React.FC<ActivityDetailsBoxProps> = ({
  activity: { endDate, startDate, totalTimeTraced, id: activityId }
}) => {
  const { getValue } = useSecureStore()
  const { userId } = useAuth()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const {
    CreateTimeRecordMutation,
    createTimeRecordData,
    createTimeRecordError
  } = useTimeRecord()

  const {
    control,
    getFieldState,
    handleSubmit,
    getValues,
    setValue,
    formState: {}
  } = useForm<CreateTimeRecordInput>({
    defaultValues: {
      amount: 0,
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
    if (!amount || !activityId) return

    CreateTimeRecordMutation({
      variables: {
        userId: await getValue(USER_ID_KEY),
        input: { activityId, amount, date }
      },
      refetchQueries: [
        {
          query: CATEGORY_COLLECTION,
          variables: { userId }
        }
      ]
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
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
      {/* <View>
        <RegularText style={styles.label} text={'Total'} />
        <RegularText
          style={styles.text}
          text={Math.ceil(totalTimeTraced).toString()}
        />
      </View> */}
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
    flexDirection: 'row',
    paddingHorizontal: spacing.$xs
  },
  label: {
    fontFamily: font.$text__bold,
    fontSize: fontSize.$xs,
    padding: spacing.$xxs
  },
  text: {
    fontFamily: font.$text__light,
    fontSize: fontSize.$xs,
    padding: spacing.$xxs
  },
  closeIcon: {
    margin: spacing.$l
  }
})
