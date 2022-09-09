import ucolors from "./UniversityColors"
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stored in firebase but not being pulled on app load yet...
roles = {
    // Exec first change
    ChapterPresident: '#F3AB44',
    VPofCommunications: '#3C86F7',
    VPofFinance: '#6FC975',
    VPofExternalRelations: '#5FCAC5',
    VPofInternalRelations: '#A89173',
    VPofMembership: '#ED695E',

    //Other roles
    AcademicChair: '#3C86F7',
    AlumniChair: '#6FC975',
    AssistantVPofCommunications: '#5FCAC5',
    AssistantVPofMembership: '#A89173',
    DEIChair: '#ED695E',
    EntrepreneurshipChair: '#3C86F7',
    MentorshipChair: '#6FC975',
    RecruitmentChair: '#5FCAC5',
    PhilanthropyChair: '#A89173',
    PRChair: '#ED695E',
    ProfessionalismChair: '#3C86F7',
    SocialChair: '#6FC975',
    IntramuralChair: '#5FCAC5',
    AssistantVPT : '#FFD700',
}

export const findRoleColor = (role) => {
    var roleKey = role.split(' ').join('');
    if (!(roleKey in roles)) {
        return '#FFFFFF';
    }
    return roles[roleKey];
}
export default colors = {
    white: "#FFFFFF",
    lightGray: "#F3F3F3",
    gray: "#C8C8C8",
    darkGray: "#777777",
    universityColor: '#C57035',
    universityFadedColor: 'rgba(255, 255, 255, 0.5)',
    errorRed: "red",
    messageGreen: "#4EA24E",

    maroon: "#75070A",
    red: "#DD222D",
    gold: "#EFA039"
}