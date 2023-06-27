import {
  FormLayout,
  Headline,
  InputText,
  ScreenLayout,
  TextButton
} from 'components'
import { StyleSheet, View } from 'react-native'

import { LoginUserInput } from 'types'
import { spacing } from 'variables'
import { useAuth } from 'context'
import { useForm } from 'react-hook-form'

interface SignInScreenProps extends LoginUserInput {
  setSignUp(bol: boolean): void
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ setSignUp }) => {
  const { signIn } = useAuth()

  const {
    control,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginUserInput>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = (data: LoginUserInput) => {
    if (data.email && data.password) {
      const { email, password } = data
      signIn(email, password)
    }
  }

  return (
    <ScreenLayout>
      {/* <IconButton
                style={{ marginTop: spacing.$xl }}
                alignRight={true}
                onPress={() => setSignUp(true)}
            >
                <Icon name="user-follow" size={36} />
            </IconButton> */}
      <FormLayout>
        <Headline type={'$xl'} text={'Login'} />
        <InputText
          label={'Email'}
          name={'email'}
          keyboardType={'email-address'}
          control={control}
          getFieldState={getFieldState}
          rules={{
            required: true
          }}
        />
        <InputText
          label={'Password'}
          name={'password'}
          secureTextEntry={true}
          control={control}
          getFieldState={getFieldState}
          rules={{
            required: true
          }}
          keyboardType={undefined}
        />
        <View style={styles.marginTop}>
          <TextButton text={'Enter'} onPress={handleSubmit(onSubmit)} primary />
          <TextButton text={'Sign up'} onPress={() => setSignUp(true)} />
        </View>
      </FormLayout>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: spacing.$m
  }
})
