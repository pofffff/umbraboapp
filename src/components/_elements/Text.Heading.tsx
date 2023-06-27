import { Text, View } from 'react-native'

import { FC } from 'react'
import { HeadlineStyle } from './Text.Heading.styles'

interface HeadlineProps {
    type: keyof typeof HeadlineStyle
    text: string
}

export const Headline: FC<HeadlineProps> = ({ type, text }) => {
    return type ? (
        <View>
            <Text style={[HeadlineStyle.base, HeadlineStyle[type]]}>
                {text}
            </Text>
        </View>
    ) : null
}
