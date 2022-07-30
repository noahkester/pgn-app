import React, { useState, useContext } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import globalStyles from "../../styles/Styles";
import LoginContext from '../../utils/LoginContext';
import { auth, db, store } from '../../utils/firebase';

function SignOutButton(props) {
    const navigation = useNavigation();

    const loginContext = useContext(LoginContext);
    const isAdmin = loginContext.isAdmin;

    return (
        <TouchableOpacity
            onPress={() => {
                auth
                    .signOut()
                    .then(() => {
                        isAdmin.current = false;
                        loginContext.setSignIn(false);

                        navigation.navigate("Router", { screen: "LoginSignup" });
                        console.log("(Account) Signed out. Navigating to Start");
                    })
                    .catch((error) => console.log(error.message));
            }}
            title={"Signout"}
            style={[
                globalStyles.universityColorFill,
                {
                    position: 'absolute',
                    bottom: 60,

                    borderRadius: 30,
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderWidth: 6,
                    borderColor: '#E9C9B2',
                },
            ]}
        >
            <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
                {"Sign out"}
            </Text>
        </TouchableOpacity>
    );
}
export function AdminSettingsPage() {
    const navigation = useNavigation();
    const [isLocked, setIsLocked] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [userError, setUserError] = useState('');
    const [userName, setUserName] = useState('');

    const setAllToActive = () => {
        db.collection("users")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.update({
                        status: 'active'
                    });
                })
            })
    }
    const deleteAllPoints = () => {
        db.collection("users")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.update({
                        submittedPoints: []
                    });
                    doc.ref.update({
                        philanthropyPoints: 0
                    });
                    doc.ref.update({
                        socialPoints: 0
                    });
                    doc.ref.update({
                        professionalPoints: 0
                    });
                })
            })
        db.collection("points")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    store.ref().child('points/' + doc.id)
                        .delete().then(() => {
                            doc.ref.delete();
                        }).catch((error) => {
                            console.log("could not delete file " + doc.id);
                        });
                })
            })
    }
    const deleteAllEvents = () => {
        db.collection("events")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                })
            })
        db.collection("chapter-meetings")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                })
            })
    }
    const deleteUser = () => {
        setUserError('');
        console.log('deleted user');
        // delete from admin members
        // delete from users
        // delete photos
        const docname = userName.replace(/\s/g, '').toLowerCase();
        console.log(docname);
        if (docname == '') return;
        db.collection("admin-members")
            .doc(docname)
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    setUserError('No user found');
                }
                else {
                    setUserName('');
                    doc.ref.delete();
                }
            })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
            <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={{ width: 68, alignItems: 'center' }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Octicons
                        name="chevron-left"
                        color={'#262626'}
                        size={42}
                    />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>Settings</Text>
                <TouchableOpacity
                    style={[{ width: 68, height: 68, borderWidth: 8, borderColor: '#F2DDCE', alignItems: 'center', justifyContent: 'center', borderRadius: 34, marginRight: 16 }, globalStyles.universityColorFill]}
                    onPress={() => {
                        setIsLocked(!isLocked);
                    }}
                >
                    <FontAwesome
                        name={isLocked ? 'lock' : 'unlock'}
                        color={'#FFFFFF'}
                        size={32}
                        style={{}}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginLeft: 10, width: '85%' }}>Semester reset commands</Text>
            <View style={{ flexDirection: 'column', width: '85%' }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 12, borderColor: '#DBDBDB', borderRadius: 10, justifyContent: 'space-between' }}
                    onPress={() => {
                        if (!isLocked) {
                            setAllToActive();
                        }
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name="shield-checkmark"
                            color={'#262626'}
                            size={32}
                            style={{}}
                        />
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10 }}>Set all to active</Text>
                    </View>
                    <FontAwesome
                        name={isLocked ? 'lock' : 'unlock'}
                        color={'#262626'}
                        size={32}
                        style={{}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 12, borderColor: '#DBDBDB', borderRadius: 10, justifyContent: 'space-between' }}
                    onPress={() => {
                        if (!isLocked) {
                            deleteAllPoints();
                        }
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name="trash"
                            color={'#262626'}
                            size={32}
                            style={{}}
                        />
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10 }}>Delete ALL points</Text>
                    </View>
                    <FontAwesome
                        name={isLocked ? 'lock' : 'unlock'}
                        color={'#262626'}
                        size={32}
                        style={{}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 12, borderColor: '#DBDBDB', borderRadius: 10, justifyContent: 'space-between' }}
                    onPress={() => {
                        if (!isLocked) {
                            deleteAllEvents();
                        }
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name="calendar-remove"
                            color={'#262626'}
                            size={32}
                            style={{}}
                        />
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10 }}>Delete ALL events</Text>
                    </View>
                    <FontAwesome
                        name={isLocked ? 'lock' : 'unlock'}
                        color={'#262626'}
                        size={32}
                        style={{}}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginLeft: 10, width: '85%' }}>Edit users</Text>
            <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DBDBDB', padding: 12, borderRadius: 10, width: '85%', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}
                placeholder="Name"
                onChangeText={(text) => {
                    setUserName(text);
                }}
                defaultValue={""}
            >
                {userName}
            </TextInput>
            {(userError == '') ? null :
                <Text style={{ width: '90%', paddingTop: 4, paddingLeft: 10, fontFamily: 'Poppins_500Medium', color: '#E35B56' }}>{userError}</Text>
            }
            {
                (editMode) ? null :
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '85%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setEditMode(!editMode);
                            }}
                        >
                            <MaterialIcons
                                name={'edit'}
                                color={'#262626'}
                                size={32}
                                style={{}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setEditMode(!editMode);
                            }}
                        >
                            <MaterialIcons
                                name={'person-add'}
                                color={'#262626'}
                                size={32}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                deleteUser();
                            }}
                        >
                            <Ionicons
                                name={'trash'}
                                color={'#262626'}
                                size={30}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
            }
            {
                (editMode) ?
                    <View style={{ width: '85%', marginTop: 10 }}>
                        <TextInput
                            style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DBDBDB', padding: 12, borderRadius: 10, width: '100%', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}
                            placeholder="Pledge Class"
                            onChangeText={(text) => {

                            }}
                            defaultValue={""}
                        />
                        <TextInput
                            style={{ marginTop: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DBDBDB', padding: 12, borderRadius: 10, width: '100%', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}
                            placeholder="Role"
                            onChangeText={(text) => {

                            }}
                            defaultValue={""}
                        />
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setEditMode(false);
                                }}
                            >
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#E35B56' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setEditMode(false);
                                }}
                            >
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#3E95EF' }}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : null
            }
            <SignOutButton />
        </View >
    )
}
