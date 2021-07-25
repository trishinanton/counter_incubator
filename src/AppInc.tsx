import React, {useEffect, useState} from 'react';
import {WindowCounter} from "./WindowCounter";
import {WindowSetCounter} from "./WindowSetCounter";
import c from "./AppInc.module.css"

function AppInc(){


    let [value, setValue] = useState<number|null>(null)
    let [disableInc, setDisableInc] = useState(true)


    let [maxValue, setMaxValue]  = useState(0)
    let [startValue, setStartValue] = useState(0)

    let [error, setError] = useState<string|null>(null)
    let [startText, setStartText]= useState<string|null>("enter values and press 'set'")


    useEffect(()=>{
        let valueAsString = localStorage.getItem('startValue')
        if (valueAsString){
            let newValue = JSON.parse(valueAsString)
            setStartValue(newValue)
        }
        let valueAsStringMax = localStorage.getItem('maxValue')
        if (valueAsStringMax){
            let newValue = JSON.parse(valueAsStringMax)
            setMaxValue(newValue)
        }
        if (valueAsString && valueAsStringMax){
            setStartText(null)
            setValue(+valueAsString)
        }
    },[])



    useEffect(()=>{
        localStorage.setItem('startValue', JSON.stringify(startValue))
    }, [startValue])
    useEffect(()=>{
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }, [maxValue])


    const onChangeInc = () => {
        if(value){
            if (value <= maxValue) {
                setValue(value+1)
            }
        }
    }
    const onReset = () => {
        setValue(startValue)
    }


    return <div className={c.body}>


        <WindowSetCounter
            maxValue = {maxValue}
            startValue = {startValue}
            setMaxValue = {setMaxValue}
            setStartValue = {setStartValue}
            setValue={setValue}
            setError={setError}
            setStartText={setStartText}
            setDisableInc={setDisableInc}
        />
        <WindowCounter
            value = {value}
            error = {error}
            startText = {startText}
            disableInc = {value===maxValue}
            disableRes = {value === startValue}
            onChangeInc = {onChangeInc}
            onReset = {onReset}
            maxValue = {maxValue}
        />

</div>




}

export default AppInc;

