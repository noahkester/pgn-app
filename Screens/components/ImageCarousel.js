import React, { useRef, useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
    Image,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import SimplePaginationDot from './SimplePaginationDot';
import globalStyles from "../../styles/Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../../styles/Colors'
import LoginContext from '../../utils/LoginContext';
const { width: windowWidth } = Dimensions.get('window');


const INITIAL_INDEX = 0;
export default function ImageCarousel(props) {
    const loginContext = useContext(LoginContext);
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

    function handleCarouselScrollEnd(item, index) {
        setCurrentIndex(index);
    }
    function renderItem({ item, index }) {
        const { uri } = item;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.item}
                onPress={() => {
                    carouselRef.current.scrollToIndex(index);
                }}>
                {(uri === "") ?
                    <View style={[styles.imageBackground, { backgroundColor: loginContext.color, borderRadius: 1000, alignItems: 'center', justifyContent: 'center' }]}>
                        <Image
                            source={require('../../images/account.png')}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </View> :
                    <ImageBackground
                        source={{ uri: uri }}
                        style={styles.imageBackground}
                    />
                }
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Carousel
                style={styles.carousel}
                data={props.data}
                renderItem={renderItem}
                itemWidth={windowWidth}
                inActiveOpacity={0.7}
                // containerWidth={0.8 * windowWidth}
                onScrollEnd={handleCarouselScrollEnd}
                ref={carouselRef}
            />
            <View>
                <SimplePaginationDot currentIndex={currentIndex} length={props.data.length} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    carousel: {
        borderWidth: 0,
        borderColor: '#C57035',
        aspectRatio: 1,
        flexGrow: 0,
        marginBottom: 20,
        borderRadius: 40,
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
    },
    imageBackground: {
        flex: 2,
        borderColor: 'blue',
    }
});
