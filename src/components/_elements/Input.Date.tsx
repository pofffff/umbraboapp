import { FC, useState } from 'react'
import { Icon, IconButton } from 'components'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, font, fontSize, spacing } from 'variables'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { RegularText } from './Text.Regular'

interface InputDateProps {
    label: string
    date?: string
    handleSetDate: (date: Date) => void
}

export const InputDate: FC<InputDateProps> = ({
    label,
    date,
    handleSetDate
}) => {
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
    // const [date, setDate] = useState(new Date())

    const handleConfirm = (date: Date) => {
        handleSetDate(date)
        setDatePickerVisible(false)
    }

    return (
        <View style={styles.wrapper}>
            <RegularText text={label} style={styles.startDateText} />
            <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                <View style={styles.startDate}>
                    <RegularText
                        text={date || 'Date'}
                        style={styles.inputText}
                    />
                    <IconButton onPress={() => setDatePickerVisible(true)}>
                        <Icon name={'calendar'} />
                    </IconButton>
                    <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisible(false)}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {},
    startDate: {
        borderWidth: 1,
        borderColor: colors.$black,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.$xs,
        marginVertical: spacing.$xs
    },

    inputText: {
        padding: spacing.$xxs,
        fontSize: fontSize.$xs,
        fontFamily: font.$text__light
    },

    startDateText: {
        fontSize: fontSize.$xs,
        fontFamily: font.$text__light
    },

    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex'
    }
})
