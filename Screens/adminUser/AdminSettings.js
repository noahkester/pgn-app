import React, { useState, useContext } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import AdminContext from "../../utils/AdminContext";

import globalStyles from "../../styles/Styles";
import LoginContext from '../../utils/LoginContext';
import { auth, db, store } from '../../utils/firebase';
import colors from "../../styles/Colors";
import { ScrollView } from "react-native-gesture-handler";

function SignOutButton(props) {
    const navigation = useNavigation();

    const loginContext = useContext(LoginContext);

    return (
        <TouchableOpacity
            onPress={() => {
                auth.signOut()
            }}
            title={"Signout"}
            style={[
                {
                    position: 'absolute',
                    bottom: 10,
                    backgroundColor: '#C57035',
                    borderRadius: 10,
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
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
    const adminContext = useContext(AdminContext);
    const [isLocked, setIsLocked] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [userError, setUserError] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [pledgeClass, setPledgeClass] = useState('');
    const [status, setStatus] = useState('');
    const [adding, setAdding] = useState(false);
    const [duesBanner, setDuesBanner] = useState(adminContext.points.activateDuesBanner);
    const [duesUsername, setDuesUsername] = useState('');
    const [duesError, setDuesError] = useState('');

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
                    doc.ref.update({
                        attendance: 0
                    });
                    doc.ref.update({
                        activeInterviews: 0
                    });
                    doc.ref.update({
                        dues: false
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
                        })
                        // .catch((error) => {
                        //     console.log("could not delete file " + doc.id);
                        // });
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
        db.collection('admin-settings')
            .doc('points')
            .update({
                totalChapterMeetings: 0
            })
    }
    const updateDues = () => {
        setDuesError('');
        const name = duesUsername.split(' ');
        if (name.length != 2) {
            setDuesError('Please type first and last name');
            return;
        }
        db.collection("users")
            .where('firstname', '==', name[0])
            .where('lastname', '==', name[1])
            .get()
            .then((querySnapshot) => {
                var found = false;
                //console.log('this' + name);
                querySnapshot.forEach((doc) => {
                    found = true;
                    //console.log(doc.data());
                    doc.ref.update({ dues: true })
                    //setDuesError(name[0] + ' ' + name[1] + ' dues updated');
                    setDuesUsername('');
                })
                if (!found) {
                    // console.log('hi')
                    setDuesError('Could not find user');
                }
            }).catch(() => {
                setDuesError('Could not find user');
            })
    }

    const deleteUser = () => {
        setUserError('');
        // TODO delete from users
        // delete photos
        const name = userName.split(' ');
        const docname = userName.replace(/\s/g, '').toLowerCase();
        if (docname == '') {
            setUserError('No user found');
            return;
        }
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
                    db.collection("users")
                        .where('firstname', '==', name[0])
                        .where('lastname', '==', name[1])
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                doc.ref.delete()
                            })
                        })
                }
            })
    }
    const updateUser = () => {
        //completely change this code
        setUserError('');
        //console.log('updating user');
        const docname = userName.replace(/\s/g, '').toLowerCase();
        const name = userName.split(' ');
        if (docname == '') return;
        const docRef = db.collection("admin-members").doc(docname);
        var userDocRef;
        db.collection("users")
            .where('firstname', '==', name[0])
            .where('lastname', '==', name[1])
            .get()
            .then((querySnapshot) => {
                var found = false;
                //console.log('this' + name);
                querySnapshot.forEach((doc) => {
                    found = true;
                    //console.log('here')
                    userDocRef = doc.ref;
                })
                if (!found) {
                    setUserError('Could not find user to update');
                } else {
                    if (role !== '') {
                        userDocRef.update({ role: role })
                        docRef.update({ role: role }).then(() => {
                            setUserName('');
                            setRole('');
                        }).catch(() => {
                            setUserError('Could not find user to update');
                        });
                    }
                    if (status !== '') {
                        userDocRef.update({ status: status.toLowerCase() })
                        docRef.update({ status: status.toLowerCase() }).then(() => {
                            setUserName('');
                            setStatus('');
                        }).catch(() => {
                            setUserError('Could not find user to update');
                        });
                    }
                    if (pledgeClass !== '') {
                        userDocRef.update({ pledgeClass: pledgeClass })
                        docRef.update({ pledgeClass: pledgeClass }).then(() => {
                            setUserName('');
                            setPledgeClass('');
                        }).catch(() => {
                            setUserError('Could not find user to update');
                        });
                    }
                }
            }).catch(() => {
                setDuesError('Could not find user');
            })
        //TODO Update user from users
    }
    const addUser = () => {
        setUserError('');
        const docname = userName.replace(/\s/g, '').toLowerCase();
        if (docname == '') return;
        db
            .collection("admin-members")
            .doc(docname)
            .set({
                status: status.toLowerCase(),
                pledgeClass: pledgeClass,
                role: role
            }).then(() => {
                setUserName('');
                setRole('');
            }).catch(() => {
                setUserError('Could not create new user');
            })
    }
    const toggleBanner = () => {
        setDuesBanner(!duesBanner);
        adminContext.points.activateDuesBanner = !adminContext.points.activateDuesBanner;
        db.collection('admin-settings')
            .doc('points')
            .update({
                activateDuesBanner: adminContext.points.activateDuesBanner
            })
    }
    return (

        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
            <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: 68 }}></View>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>Settings</Text>
                <TouchableOpacity
                    style={{ width: 50, height: 50, backgroundColor: '#C57035' + '40', alignItems: 'center', justifyContent: 'center', borderRadius: 34, marginRight: 16 }}
                    onPress={() => {
                        setIsLocked(!isLocked);
                    }}
                >
                    <FontAwesome
                        name={isLocked ? 'lock' : 'unlock'}
                        color={'#C57035'}
                        size={32}
                        style={{}}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '100%' }}>
                <View style={{ width: '100%', alignItems: 'center', marginBottom: 100 }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginLeft: 10, width: '90%' }}>Semester reset commands</Text>
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                        <TouchableOpacity
                            style={{ paddingLeft: '5%', paddingRight: '5%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 12, borderColor: '#DBDBDB', justifyContent: 'space-between' }}
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
                            style={{ paddingLeft: '5%', paddingRight: '5%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, padding: 12, borderColor: '#DBDBDB', justifyContent: 'space-between' }}
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
                            style={{ paddingLeft: '5%', paddingRight: '5%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, padding: 12, borderColor: '#DBDBDB', justifyContent: 'space-between' }}
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
                    <Text style={{ marginTop: 50, fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginLeft: 10, width: '90%' }}>Dues</Text>

                    <TouchableOpacity
                        style={{ width: '100%', paddingLeft: '5%', paddingRight: '5%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 12, borderColor: '#DBDBDB', justifyContent: 'space-between' }}
                        onPress={() => {
                            toggleBanner()
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name="exclamation"
                                color={'#262626'}
                                size={32}
                                style={{}}
                            />
                            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10 }}>Show Banner for Dues</Text>
                        </View>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>{duesBanner ? 'ON' : 'OFF'}</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 20, fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginLeft: 10, width: '90%' }}>User Payment</Text>

                    <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ marginTop: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DBDBDB', padding: 10, borderRadius: 10, width: '90%', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}
                            placeholder="Name"
                            onChangeText={(text) => {
                                setDuesUsername(text);
                            }}
                            defaultValue={""}
                            autoComplete={false}
                            autoCorrect={false}
                        >
                            {duesUsername}
                        </TextInput>
                        <TouchableOpacity
                            onPress={() => {
                                updateDues();
                            }}
                        >
                            <FontAwesome5Icon
                                name={'money-bill-wave'}
                                color={'#262626'}
                                size={24}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                    {(duesError == '') ? null :
                        <Text style={{ width: '90%', paddingTop: 4, paddingLeft: 10, fontFamily: 'Poppins_500Medium', color: '#E35B56' }}>{duesError}</Text>
                    }
                    <Text style={{ marginTop: 60, fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginLeft: 10, width: '90%' }}>Manage users</Text>
                    <TextInput
                        style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DBDBDB', padding: 10, borderRadius: 10, width: '90%', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}
                        placeholder="Name"
                        onChangeText={(text) => {
                            setUserName(text);
                        }}
                        defaultValue={""}
                        autoComplete={false}
                        autoCorrect={false}
                    >
                        {userName}
                    </TextInput>
                    {(userError == '') ? null :
                        <Text style={{ width: '90%', paddingTop: 4, paddingLeft: 10, fontFamily: 'Poppins_500Medium', color: '#E35B56' }}>{userError}</Text>
                    }
                    {
                        (editMode) ? null :
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '90%' }}>
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
                                        setAdding(true);
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
                            <View style={{ width: '90%', marginTop: 10 }}>
                                <TextInput
                                    style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DBDBDB', padding: 10, borderRadius: 10, width: '100%', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}
                                    placeholder="Pledge Class"
                                    onChangeText={(text) => {
                                        setPledgeClass(text);
                                    }}
                                    defaultValue={""}
                                />
                                <TextInput
                                    style={{ marginTop: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DBDBDB', padding: 10, borderRadius: 10, width: '100%', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}
                                    placeholder="Status"
                                    onChangeText={(text) => {
                                        setStatus(text);
                                    }}
                                    defaultValue={""}
                                />
                                <TextInput
                                    style={{ marginTop: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DBDBDB', padding: 10, borderRadius: 10, width: '100%', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}
                                    placeholder="Role"
                                    onChangeText={(text) => {
                                        setRole(text);
                                    }}
                                    defaultValue={""}
                                />
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setEditMode(false);
                                            setAdding(false);
                                        }}
                                    >
                                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#E35B56' }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setEditMode(false);
                                            setAdding(false);
                                            (adding) ? addUser() : updateUser();
                                        }}
                                    >
                                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#3E95EF' }}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null
                    }
                </View>
            </ScrollView>
            <SignOutButton />
        </View >
    )
}
