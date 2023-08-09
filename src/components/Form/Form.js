import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList } from "react-native";
import ResultImc from "./ResultImc/ResultImc";
import styles from "./style";

export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Set height and weight")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calculate")
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    function imcCalculator() {
        let heightFormat = height.replace(",", ".")
        let weightFormat = weight.replace(",", ".")
        let totalImc = ((weightFormat) / (heightFormat * heightFormat)).toFixed(2)
        setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }])
        setImc(totalImc)
    }

    function verificateImc() {
        if (imc === null) {
            Vibration.vibrate()
            setErrorMessage("Required Info*")
        }
    }

    function validator() {
        if (weight != null & height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Your BMI")
            setTextButton("Calculate again")
            setErrorMessage(null)
        } else {
            verificateImc()
            setImc(null)
            setTextButton("Calculate")
            setMessageImc("Set height and weight")
        }

    }

    return (

        <View style={styles.formContext}>
            {imc === null ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Height</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.formInput}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex: 1.75"
                        keyboardType="numeric" />
                    <Text style={styles.formLabel}>Weight</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.formInput}
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="Ex: 60"
                        keyboardType="numeric" />
                    <TouchableOpacity
                        onPress={() => validator()}
                        style={styles.buttonCalculator}>
                        <Text style={styles.textButtonCalculator}>Calculate</Text>
                    </TouchableOpacity>
                </Pressable>
                :
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                    <TouchableOpacity
                        onPress={() => validator()}
                        style={styles.buttonCalculator}>
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList
            showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={[...imcList].reverse()}
                renderItem={({ item }) => {
                    return (
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>BMI Result = </Text> {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item) => {
                    item.id
                }}
            />
        </View>
    );
}