import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS } from '../constants'
import { AntDesign } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)

    const handleSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate('BottomTabNavigation')
        } catch (err) {
            setErr(true)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <PageTitle
                    title="Return"
                    onPress={() => {
                        navigation.navigate('Walkthrough')
                    }}
                />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: COLORS.secondaryWhite,
                            borderRadius: 50,
                            marginVertical: 48,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AntDesign name="user" size={64} color={COLORS.black} />
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                        >
                            <AntDesign
                                name="pluscircle"
                                size={24}
                                color={COLORS.black}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 22 }}>
                        <Input
                            id="email"
                            placeholder="email"
                            value={email}
                            onChangeText={(e) => {
                                setEmail(e)
                            }}
                        />
                        <Input
                            id="password"
                            placeholder="Mật khẩu "
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(e) => {
                                setPassword(e)
                            }}
                        />

                        <Button
                            title="Đăng nhập"
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginBottom: 48,
                            }}
                            onPress={() => handleSubmit()}
                        />
                    </View>
                    {err && <Text>Something went wrong</Text>}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Signin
