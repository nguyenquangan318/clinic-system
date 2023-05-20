import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS } from '../constants'
import { AntDesign } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'

const Signin = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <PageTitle
                    title="Sign in"
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
                        <Input id="email" placeholder="email" />
                        <Input id="password" placeholder="Mật khẩu " />

                        <Button
                            title="Đăng nhập"
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginBottom: 48,
                            }}
                            onPress={() =>
                                navigation.navigate('BottomTabNavigation')
                            }
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Signin
