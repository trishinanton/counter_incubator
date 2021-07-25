import React, {useEffect, useState} from 'react';
import {WindowCounter} from "./WindowCounter";
import {WindowSetCounter} from "./WindowSetCounter";
import c from "./AppInc.module.css"

function AppInc(){


    let [value, setValue] = useState<number|null>(null)
    let [disableInc, setDisableInc] = useState(true)
    let [disableRes, setDisableRes] = useState(true)

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
    },[])
    useEffect(()=>{
        let valueAsString = localStorage.getItem('maxValue')
        if (valueAsString){
            let newValue = JSON.parse(valueAsString)
            setMaxValue(newValue)
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
            value++
            if (value < maxValue) {
                setValue(value)
                setDisableRes(false)
            } else if(value = maxValue){
                setValue(value)
                setDisableInc(true)
                setDisableRes(false)
            }else {
                setDisableInc(true)
            }
        }


    }
    const onReset = () => {
        setValue(startValue)
        setDisableInc(false)
        setDisableRes(true)
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
            disableInc = {disableInc}
            disableRes = {disableRes}
            onChangeInc = {onChangeInc}
            onReset = {onReset}
            maxValue = {maxValue}
        />

</div>




}

export default AppInc;

