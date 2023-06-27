import // AntDesign,
// Ionicons,
// MaterialCommunityIcons
// SimpleLineIcons
'react-native-vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { FC } from 'react'

interface IconProps {
  color?: string
  size?: number
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  // name: keyof typeof MaterialCommunityIcons.name
}
export const Icon: FC<IconProps> = ({ size = 24, name, color = 'black' }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />
}
