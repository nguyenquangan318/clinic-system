import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
} from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS } from '../constants'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { contacts } from '../constants/data'
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Contacts = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [user, setUser] = useState([])
    const [err, setErr] = useState(false)
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const handleSearch = async (text) => {
        setSearch(text)
        const filteredData = contacts.filter((user) =>
            user.userName.toLowerCase().includes(text.toLowerCase())
        )
        setFilteredUsers(filteredData)
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            onPress={() =>
                navigation.navigate('PersonalChat', {
                    userName: item.userName,
                })
            }
            style={[
                {
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 22,
                    borderBottomColor: COLORS.secondaryWhite,
                    borderBottomWidth: 1,
                },
                index % 2 !== 0
                    ? {
                          backgroundColor: COLORS.tertiaryWhite,
                      }
                    : null,
            ]}
        >
            <View
                style={{
                    paddingVertical: 15,
                    marginRight: 22,
                }}
            >
                <Image
                    source={require('../assets/images/149071.png')}
                    resizeMode="contain"
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'column',
                }}
            >
                <Text style={{ ...FONTS.h4, marginBottom: 4 }}>
                    {item.userName}
                </Text>
                <Text style={{ fontSize: 14, color: COLORS.secondaryGray }}>
                    {item.lastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 22,
                            marginTop: 22,
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>Clinics</Text>
                        <TouchableOpacity
                            onPress={() => console.log('Add contacts')}
                        >
                            <AntDesign
                                name="plus"
                                size={20}
                                color={COLORS.secondaryBlack}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 22,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.secondaryWhite,
                            height: 48,
                            marginVertical: 22,
                            paddingHorizontal: 12,
                            borderRadius: 20,
                        }}
                    >
                        <Ionicons
                            name="ios-search-outline"
                            size={24}
                            color={COLORS.black}
                        />

                        <TextInput
                            style={{
                                width: '100%',
                                height: '100%',
                                marginHorizontal: 12,
                            }}
                            value={search}
                            onChangeText={handleSearch}
                            placeholder="Search contact..."
                        />
                    </View>

                    <View
                        style={{
                            paddingBottom: 100,
                        }}
                    >
                        <FlatList
                            data={filteredUsers}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Contacts
