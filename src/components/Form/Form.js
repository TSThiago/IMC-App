import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc/ResultImc";
import styles from "./style";

export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Set height and weight")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calculate")
    const [classification, setClassification] = useState("")

    // function imcCalculator() {
    //     setImc(((weight) / (height * height)).toFixed(2))
    //     if (imc < 18.5) {
    //         setClassification("Underweight")
    //     } else if (imc >= 18.5 && imc < 25) {
    //         setClassification("Normal Weight")
    //     } else if (imc >= 25 && imc < 30) {
    //         setClassification("Overweight")
    //     } else if (imc >= 30 && imc < 35) {
    //         setClassification("Obese I")
    //     } else if (imc >= 35 && imc < 40) {
    //         setClassification("Obese II")
    //     } else if (imc > 40){
    //         setClassification("Obese III")
    //     }
    //     return
    // }

    function validator() {
        if (weight != null & height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Your BMI")
            setTextButton("Calculate again")
            return
        }
        setImc(null)
        setTextButton("Calculate")
        setMessageImc("Set height and weight")
        setClassification("")
    }

    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Height</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric" />

                <Text style={styles.formLabel}>Weight</Text>
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
        </View>
    );
}