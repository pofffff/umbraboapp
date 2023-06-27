import {
    AntDesign,
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons
} from '@expo/vector-icons'

import { FC } from 'react'

interface IconProps {
    color?: string
    size?: number
    name: keyof typeof MaterialCommunityIcons.glyphMap
}
export const Icon: FC<IconProps> = ({ size = 24, name, color = 'black' }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />
}
