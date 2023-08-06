import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style";

export default function ResultImc(props) {

    const onShare = async () => {
        const result = await Share.share({
            message: "My BMI is: " + props.resultImc,
        })
    }

    return (
        <View style={styles.resultImc}>
            <View style={styles.boxShareButton}>
                {props.resultImc !== null ?
                    <TouchableOpacity 
                    onPress={() => onShare()}
                    style={styles.shared}
                    >
                        <Text style={styles.sharedText}>Share</Text>
                    </TouchableOpacity>
                    :
                    <View />
                }
            </View>
            <Text style={styles.informationText}>{props.messageResultImc}</Text>
            <Text style={styles.numberImc}>{props.resultImc}</Text>
            <Text style={styles.classificationText}>{props.classification}</Text>
        </View>
    )
}