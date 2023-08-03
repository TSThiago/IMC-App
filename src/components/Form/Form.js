import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import ResultImc from "./ResultImc";

export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Set height and weight")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calculate")

    function imcCalculator() {
        return setImc(((weight) / (height * height)).toFixed(2))
    }

    function validator() {
        if (weight != null & height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Your IMC")
            setTextButton("Calculate again")
            return
        }
        setImc(null)
        setTextButton("Calculate")
        setMessageImc("Set height and weight")
    }

    return (
        <View>
            <View>
                <Text>Height</Text>
                <TextInput
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric" />
                <Text>Weight</Text>
                <TextInput
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex: 60"
                    keyboardType="numeric" />
                <Button
                onPress={() => validator()}  
                title={textButton} />
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc} />
        </View>
    );
}