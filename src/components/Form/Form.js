import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard } from "react-native";
import ResultImc from "./ResultImc/ResultImc";
import styles from "./style";

export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Set height and weight")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calculate")
    const [classification, setClassification] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    function imcCalculator() {
        let heightFormat = height.replace("," , ".")
        let weightFormat = weight.replace("," , ".")
        setImc(((weightFormat) / (heightFormat * heightFormat)).toFixed(2))
    }

    function verificateClassification() {
        if (imc < 18.5) {
            setClassification("Underweight")
            return
        } else if (imc >= 18.5 && imc < 25) {
            setClassification("Normal Weight")
            return
        } else if (imc >= 25 && imc < 30) {
            setClassification("Overweight")
            return
        } else if (imc >= 30 && imc < 35) {
            setClassification("Obese I")
            return
        } else if (imc >= 35 && imc < 40) {
            setClassification("Obese II")
            return
        } else if (imc > 40) {
            setClassification("Obese III")
            return
        }
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
            verificateClassification()
            return
        }
        verificateImc()
        setImc(null)
        setTextButton("Calculate")
        setMessageImc("Set height and weight")
        setClassification(null)
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
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
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </Pressable>
    );
}