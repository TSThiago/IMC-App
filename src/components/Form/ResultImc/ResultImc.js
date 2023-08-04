import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default function ResultImc(props) {
    return (
        <View style={styles.resultImc}>
            <Text style={styles.informationText}>{props.messageResultImc}</Text>
            <Text style={styles.numberImc}>{props.resultImc}</Text>
            <Text style={styles.classificationText}>{props.classification}</Text>
        </View>
    )
}