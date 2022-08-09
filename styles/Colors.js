import ucolors from "./UniversityColors"

export const findRoleColor = (role) => {
    switch (role) {
        case 'Chapter President':
            return '#F3AB44';
        case 'VP of Communications':
            return '#3C86F7';
        case 'VP of Finance':
            return '#6FC975';
        case 'VP of External Relations':
            return '#5FCAC5';
        case 'VP of Internal Relations':
            return '#A89173';
        case 'VP of Membership':
            return '#ED695E';
    }
    return '#FFFFFF'
}
export const findRoleBorder = (role) => {
    switch (role) {
        case 'Chapter President':
            return '#DDA048';
        case 'VP of Communications':
            return '#3778DC';
        case 'VP of Finance':
            return '#65B66A';
        case 'VP of External Relations':
            return '#59BAB5';
        case 'VP of Internal Relations':
            return '#978266';
        case 'VP of Membership':
            return '#D45E54';
    }
    return '#FFFFFF'
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