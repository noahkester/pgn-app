import ucolors from "./UniversityColors"

// should be stored in firebase like this....
roles = {
    // Exec first
    ChapterPresident: '#F3AB44',
    VPofCommunications: '#3C86F7',
    VPofFinance: '#6FC975',
    VPofExternalRelations: '#5FCAC5',
    VPofInternalRelations: '#A89173',
    VPofMembership: '#ED695E',

    //Other roles
    AcademicChair: 'red',
    AlumniChair: 'red',
    AssistantVPofCommunications: 'red',
    AssistantVPofMembership: 'red',
    DEIChair: 'red',
    EntrepreneurshipChair: 'red',
    MentorshipChair: 'red',
    RecruitmentChair: 'red',
    PhilanthropyChair: 'red',
    PRChair: 'red',
    ProfessionalismChair: 'red',
    SocialChair: 'red',
    IntramuralChair: 'red',

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
    universityColor: '#C57035', /*'#372666',/*ucolors.uTexas,*/
    universityFadedColor: 'rgba(255, 255, 255, 0.5)',
    errorRed: "red",
    messageGreen: "#4EA24E",

    maroon: "#75070A",
    red: "#DD222D",
    gold: "#EFA039"
}