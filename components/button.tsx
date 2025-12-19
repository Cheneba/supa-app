import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void
    color?: string;
}

const Btn: React.FC<CustomButtonProps> = ({title, onPress, color}) => {
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: color || ''}]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default Btn