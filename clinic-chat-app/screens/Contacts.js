import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { FONTS, COLORS } from '../constants'
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
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Chats = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [err, setErr] = useState(false)
    const [chats, setChats] = useState([])
    const [users, setUsers] = useState([])
    // const [filteredChats, setFilteredChats] = useState([])

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        const getChats = () => {
            let users = []
            const q = query(
                collection(db, 'users'),
                where('role', '==', 'admin')
            )
            const unsub = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.push(doc.data())
                })
                setChats(users)
                setUsers(users)
            })
            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid])

    const handleSearch = async (text) => {
        let userArr = []
        setSearch(text)
        if (text == '') {
            setErr(false)
            setChats(users)
        }
        const q = query(collection(db, 'users'), where('role', '==', 'admin'))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                if (
                    doc.data().clinicName.includes(text.trim()) &&
                    text != '' &&
                    text != ' '
                ) {
                    setErr(false)
                    userArr.push(doc.data())
                }
            })
            if (userArr.length == 0 && text.length != 0) {
                setErr(true)
            }
            const filteredData = userArr
            if (userArr.length != 0) {
                setChats(filteredData)
            }
        } catch (err) {
            console.log('err')
            setErr(true)
        }
    }

    const handleSearchSelect = async (user) => {
        setSearch('')
        setFilteredChats([])
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.id
                ? currentUser.uid + user.id
                : user.id + currentUser.uid
        try {
            const res = await getDoc(doc(db, 'chats', combinedId))
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] })

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        id: user.id,
                        clinicName: user.clinicName,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                })

                await updateDoc(doc(db, 'userChats', user.id), {
                    [combinedId + '.userInfo']: {
                        id: currentUser.uid,
                        name: currentUser.displayName,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                })
            }
        } catch (err) {}
    }

    const handleSelect = (item) => {
        dispatch({ type: 'CHANGE_USER', payload: item })
        navigation.navigate('PersonalChat', {
            clinicName: item.clinicName,
        })
    }

    const renderSearchItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            onPress={() => handleSearchSelect(item)}
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
            ></View>
            <View
                style={{
                    flexDirection: 'column',
                }}
            >
                <Text style={{ ...FONTS.h4, marginBottom: 4, height: 40 }}>
                    {item.clinicName}
                </Text>
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            // onPress={() => handleSelect(item[1])}
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
                    {item.clinicName}
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
                        <Text style={{ ...FONTS.h4 }}>Chats</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => console.log('Add contacts')}
                            >
                                <MaterialCommunityIcons
                                    name="message-badge-outline"
                                    size={20}
                                    color={COLORS.secondaryBlack}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 12,
                                }}
                                onPress={() => console.log('Add contacts')}
                            >
                                <MaterialCommunityIcons
                                    name="playlist-check"
                                    size={20}
                                    color={COLORS.secondaryBlack}
                                />
                            </TouchableOpacity>
                        </View>
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
                        {err && <Text>User not found!</Text>}
                        {/* <FlatList
                            data={filteredChats}
                            renderItem={renderSearchItem}
                            keyExtractor={(item) => item.id.toString()}
                        /> */}
                        <FlatList
                            data={chats}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Chats
