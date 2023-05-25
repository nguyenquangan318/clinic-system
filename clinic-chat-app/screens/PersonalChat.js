import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
    onSnapshot,
} from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

const PersonalChat = ({ navigation }) => {
    const [messages, setMessages] = useState([])

    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId])
    // console.log(messages)
    // useEffect(() => {
    //     console.log(data)
    //     setMessages([
    //         {
    //             _id: 1,
    //             text: 'Hello developer',
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: 'React Native',
    //                 avatar: 'https://placeimg.com/140/140/any',
    //             },
    //         },
    //     ])
    // }, [])

    // const onSend = useCallback((messages = []) => {
    //     setMessages((previousMessages) =>
    //         GiftedChat.append(previousMessages, messages)
    //     )
    // }, [])

    const handleSend = async (message) => {
        const text = message[0].text
        await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            }),
        })

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', data.user.id), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        })
    }

    // change button of send
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View
                    style={{
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        borderRadius: 18,
                        backgroundColor: COLORS.primary,
                        marginRight: 5,
                        marginBottom: 5,
                    }}
                >
                    <FontAwesome name="send" size={12} color={COLORS.white} />
                </View>
            </Send>
        )
    }

    // customize sender messages
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.primary,
                    },
                }}
                textStyle={{
                    right: {
                        color: COLORS.white,
                    },
                }}
            />
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
            <StatusBar style="light" backgroundColor={COLORS.white} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 22,
                    backgroundColor: COLORS.white,
                    height: 60,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Chats')}
                    >
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.h4, marginLeft: 8, width: 230 }}>
                        {data.user.clinicName}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => console.log('search')}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <MaterialIcons
                            name="search"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('Menu')}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <MaterialIcons
                            name="menu"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <GiftedChat
                messages={messages
                    .sort((a, b) => b.date.seconds - a.date.seconds)
                    .map((msg) => ({
                        _id: msg.id,
                        text: msg.text,
                        createdAt: new Date(msg.date.seconds * 1000),
                        user: {
                            _id: msg.senderId,
                            avatar: 'https://placeimg.com/140/140/any',
                        },
                    }))}
                onSend={(message) => handleSend(message)}
                user={{
                    _id: currentUser.uid,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                textInputStyle={{
                    borderRadius: 22,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    marginRight: 6,
                    paddingHorizontal: 12,
                }}
            />
        </SafeAreaView>
    )
}

export default PersonalChat
