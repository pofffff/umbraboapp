import { FC, useEffect } from 'react'
import {
    FormLayout,
    Headline,
    Icon,
    IconButton,
    InputText,
    ScreenLayout,
    TextButton
} from 'components'
import { StyleSheet, View } from 'react-native'

import { CreateUserInput } from 'types'
import { SIGN_UP_USER } from 'services/api'
import { spacing } from 'variables'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'

interface SignUpScreenProps extends CreateUserInput {
    setSignUp(bol: boolean): void
}

export const SignUpScreen: FC<SignUpScreenProps> = ({ setSignUp }) => {
    const [signUp, { data, loading, error }] = useMutation(SIGN_UP_USER)
    const {
        control,
        getValues,
        getFieldState,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<CreateUserInput>({
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
            passwordControl: ''
        },
        mode: 'onChange'
    })
    const onSubmit = (data: CreateUserInput) => {
        const { passwordControl, ...input } = data
        signUp({ variables: { input: input } })
    }

    useEffect(() => {
        if (data) {
            setSignUp(false)
        }
        if (error) {
            console.error(error)
        }
        // TODO: Display error from BE
    }, [data, error])

    return (
        <ScreenLayout>
            {/* <IconButton
                style={{ marginTop: spacing.$xl }}
                onPress={() => setSignUp(false)}
                alignRight={true}
            >
                <Icon name={'login'} size={36} />
            </IconButton> */}
            <FormLayout>
                <Headline type={'$xl'} text={'Sign up'} />
                <InputText
                    label={'Display name'}
                    name={'displayName'}
                    control={control}
                    getFieldState={getFieldState}
                    rules={{
                        required: true,
                        minLength: {
                            value: 2,
                            message: 'At least 2 characters'
                        }
                    }}
                    keyboardType={undefined}
                />
                <InputText
                    label={'Email'}
                    name={'email'}
                    keyboardType={'email-address'}
                    control={control}
                    getFieldState={getFieldState}
                    rules={{
                        required: true,
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Not a valid email'
                        }
                    }}
                />
                <InputText
                    label={'Password'}
                    name={'password'}
                    secureTextEntry={true}
                    control={control}
                    getFieldState={getFieldState}
                    rules={{
                        required: true,
                        minLength: {
                            value: 8,
                            message: 'At least 8 characters'
                        }
                    }}
                    keyboardType={undefined}
                />
                <InputText
                    label={'One more time please'}
                    name={'passwordControl'}
                    secureTextEntry={true}
                    control={control}
                    getFieldState={getFieldState}
                    rules={{
                        required: true,
                        minLength: {
                            value: 8,
                            message: 'At least 8 characters'
                        },
                        validate: {
                            passwordMatch: (value: string) =>
                                value === getValues('password')
                        }
                    }}
                    keyboardType={undefined}
                />
                <View style={styles.marginTop}>
                    <TextButton
                        text={'Create'}
                        onPress={handleSubmit(onSubmit)}
                        primary
                    />
                    <TextButton
                        text={'Sign in'}
                        onPress={() => setSignUp(false)}
                    />
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
