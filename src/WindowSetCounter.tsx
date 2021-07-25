import React, {ChangeEvent, MouseEvent, useState} from "react";
import {Button} from "./Button";
import c from "./WindowCounter.module.css"

type PropsType = {
    maxValue: number
    startValue: number
    setMaxValue: (value:number)=>void
    setStartValue: (value:number) =>void
    setValue: (value:number) =>void
    setError: (error:string|null)=>void
    setStartText: (value:string|null)=>void
    setDisableInc:(value:boolean)=>void
}

export function WindowSetCounter(props: PropsType) {

    let [localMax, setLocalMax] = useState(0)
    let [localStart, setLocalStart] = useState(0)
    let [disableSetBtn, setDisableSetBtn] = useState(true)

    const setMaxValue =(e:MouseEvent<HTMLButtonElement, MouseEvent> |ChangeEvent<HTMLInputElement>)=>{
        setLocalMax(+e.currentTarget.value)
        setDisableSetBtn(false)
    }
    const setStartValue = (e:MouseEvent<HTMLButtonElement, MouseEvent> |ChangeEvent<HTMLInputElement>)=>{
        setLocalStart(+e.currentTarget.value)
        setDisableSetBtn(false)
        props.setError('')
        if(+e.currentTarget.value < 0){
            setDisableSetBtn(true) //почему если поместить это выражение выше, оно не работает?
            props.setError('Incorrect value!')
        }else if(+e.currentTarget.value >= localMax){
            props.setDisableInc(true)
            setDisableSetBtn(true)
            props.setError('Incorrect value!')
        }

    }
    const setValue = () =>{
        props.setMaxValue(localMax)
        props.setStartValue(localStart)
        props.setValue(localStart)
        setDisableSetBtn(true)
        props.setStartText(null)
        props.setDisableInc(false)
        props.setError(null)
    }
    return <div className={c.window}>
        <div className={c.setValue}>
            <div>max value:</div>
            <div><input onChange={setMaxValue} type='number' value={localMax}></input></div>
        </div>

        <div className={c.setValue}>
            <div>start value:</div>
            <div><input onChange={setStartValue} type='number' value={localStart} ></input></div>
        </div>

        <div className={c.button__wrapper + ' ' + c.button__set}>
            <Button onChange={setValue} disable={disableSetBtn}>set</Button>
        </div>
    </div>
}