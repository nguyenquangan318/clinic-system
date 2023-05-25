import { View, Text, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS } from '../constants'
import { AntDesign } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [err, setErr] = useState(false)

    const handleSubmit = async () => {
        try {
            //Create user
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            await updateProfile(res.user, {
                displayName: name,
            })

            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
                id: res.user.uid,
                email,
                name,
                age,
                address,
                phone,
            })
            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            navigation.navigate('Signin')
        } catch (err) {
            setErr(true)
            console.log(err)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView>
                <PageContainer>
                    <PageTitle
                        title="Return"
                        onPress={() => navigation.navigate('Walkthrough')}
                    />
                    <KeyboardAvoidingView>
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
                                <AntDesign
                                    name="user"
                                    size={64}
                                    color={COLORS.black}
                                />
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

                            <View
                                style={{ width: '100%', paddingHorizontal: 22 }}
                            >
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={(e) => {
                                        setEmail(e)
                                    }}
                                />
                                <Input
                                    id="password"
                                    placeholder="Mật khẩu"
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={(e) => {
                                        setPassword(e)
                                    }}
                                />
                                <Input
                                    id="name"
                                    placeholder="Họ và tên"
                                    value={name}
                                    onChangeText={(e) => {
                                        setName(e)
                                    }}
                                />
                                <Input
                                    id="age"
                                    placeholder="tuổi"
                                    value={age}
                                    onChangeText={(e) => {
                                        setAge(e)
                                    }}
                                />
                                <Input
                                    id="address"
                                    placeholder="Địa chỉ"
                                    value={address}
                                    onChangeText={(e) => {
                                        setAddress(e)
                                    }}
                                />
                                <Input
                                    id="phone"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                    onChangeText={(e) => {
                                        setPhone(e)
                                    }}
                                />

                                <Button
                                    title="Đăng ký"
                                    style={{
                                        width: '100%',
                                        paddingVertical: 12,
                                        marginBottom: 48,
                                    }}
                                    onPress={() => {
                                        handleSubmit()
                                    }}
                                />
                            </View>

                            {err && <Text>Something went wrong</Text>}
                        </View>
                    </KeyboardAvoidingView>
                </PageContainer>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Signup
