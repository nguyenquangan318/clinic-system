import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS } from '../constants'
import { AntDesign } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signup = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView>
                <PageContainer>
                    <PageTitle
                        title="Your Profile"
                        onPress={() => navigation.navigate('Walkthrough')}
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

                        <View style={{ width: '100%', paddingHorizontal: 22 }}>
                            <Input
                                id="email"
                                placeholder="Email"
                                // errorText="invalid input"
                            />
                            <Input id="password" placeholder="Mật khẩu" />
                            <Input id="name" placeholder="Họ và tên" />
                            <Input id="age" placeholder="tuổi" />
                            <Input id="address" placeholder="Địa chỉ" />

                            <Button
                                title="Đăng ký"
                                style={{
                                    width: '100%',
                                    paddingVertical: 12,
                                    marginBottom: 48,
                                }}
                                onPress={() => navigation.navigate('Signin')}
                            />
                        </View>
                    </View>
                </PageContainer>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Signup
