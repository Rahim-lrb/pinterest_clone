import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { wp, hp } from '@/helpers/common'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@/constants/Theme';
import { useRouter } from 'expo-router';


export default function index() {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Image source={require("../../assets/images/welcome.png")} resizeMode='cover' style={styles.bgImage}  />
            <Animated.View entering={FadeInDown.duration(600)} style={styles.animatedView}>
                <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 0.8}} style={styles.gradient}/>
                <View style={styles.contentContainer}>
                    <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.title} >Pixels</Animated.Text>
                    <Animated.Text entering={FadeInDown.delay(600).springify()} style={styles.punchline} >Every pixel tells a story</Animated.Text>
                    <Pressable style={styles.startBtn} onPress={() => router.push("home")}>
                        <Text style={styles.startText}>Start Exploring</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        width: wp(100),
        height: hp(100), 
        position: "absolute",
    },
    gradient: {
        width: '100%', 
        height: '100%',
        position: 'absolute',
    },
    animatedView: {
        position: 'absolute',
        width: wp(100),
        // height: hp(65),
        bottom: 0, 
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14
    },
    title:{
        fontSize: hp(7),
        color: theme.colors.neutral(0.9),
        fontWeight: 'bold' 
    },
    punchline:{
        fontSize: hp(2),
        letterSpacing: 1,
        marginBottom: 10,
        color: theme.colors.neutral(0.9),
        fontWeight: '500'
    },
    startBtn:{
        backgroundColor: theme.colors.black, 
        marginBottom: 50,
        padding: 15,
        paddingHorizontal: 90,
        borderRadius: theme.radius.sm,
        borderCurve: "continuous"
    },
    startText:{
        color: theme.colors.white,
        fontWeight: theme.fonts.medium,
        fontSize: hp(3),
        letterSpacing: 1
    }
});
