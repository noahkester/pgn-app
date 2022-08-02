import { TouchableOpacity, Text, Image, View, ScrollView } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState } from "react";

function ChatImage(props) {
    const [liked, setLiked] = useState(false);

    return (
        <View style={{ backgroundColor: '#FFFFFF', width: '100%', marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#DBDBDB', borderRadius: 10, flexDirection: 'row', padding: 16 }}>
            <View style={{ width: '84%' }}>
                <Image
                    source={require("../images/pgn.png")}
                    resizeMode="contain"
                    style={{width: 200, height: 200}}
                />
            </View>
            <View style={{ width: '16%', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        setLiked(!liked);
                    }}
                >
                    {props.winner ?
                        <FontAwesome
                            name={'trophy'}
                            color={'#EFA039'}
                            size={24}
                        /> :
                        <FontAwesome
                            name={liked ? "heart" : 'heart-o'}
                            color={liked ? '#DB565B' : '#262626'}
                            size={24}
                        />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}




function ChatText(props) {
    const [liked, setLiked] = useState(false);

    return (
        <View style={{ backgroundColor: '#FFFFFF', width: '100%', marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#DBDBDB', borderRadius: 10, flexDirection: 'row', padding: 16 }}>
            <View style={{ width: '84%' }}>
                <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16 }}>{props.text}</Text>
            </View>
            <View style={{ width: '16%', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        setLiked(!liked);
                    }}
                >
                    {props.winner ?
                        <FontAwesome
                            name={'trophy'}
                            color={'#EFA039'}
                            size={24}
                        /> :
                        <FontAwesome
                            name={liked ? "heart" : 'heart-o'}
                            color={liked ? '#DB565B' : '#262626'}
                            size={24}
                        />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}


export function ChatPage() {
    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFA', alignItems: 'center' }}>
            <ScrollView style={{ width: '100%' }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '90%' }}>
                        <View style={{ borderBottomWidth: 1, marginBottom: 10, paddingBottom: 8, marginTop: 10, borderColor: '#D8D8D8' }}>
                            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#FCECD7', alignItems: 'center', justifyContent: 'center' }}>
                                    <MaterialCommunityIcons
                                        name="trophy"
                                        color={'#EFA039'}
                                        size={32}
                                    />

                                </View>
                                <Text style={{ marginLeft: 12, fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#262626' }}>Last weeks winner</Text>
                            </View>
                            <ChatText text={'I need a room full of mirrors so I can be surrounded by winners'} winner={true} />
                        </View>
                        <ChatText text={'Some people have to work within the existing consciousness while some people can shift the consciousness'} />
                        <ChatText text={'Today will be the greatest day so far. Life keeps getting better and better.'} />
                        <ChatImage />
                        <ChatText text={'You can say anything as long as you put the right emoji next to it.'} />
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}