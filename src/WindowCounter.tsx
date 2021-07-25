import React from "react";
import {Button} from "./Button";
import c from "./WindowCounter.module.css"



type PropsType = {
    value: number|null
    error: string | null
    startText: string|null
    disableInc: boolean
    disableRes: boolean
    onChangeInc: ()=>void
    onReset: ()=>void
    maxValue: number
}

export function WindowCounter(props: PropsType) {
    const classNameCounter = (props.error? c.error : c.values) + ' ' + (props.value === props.maxValue ? c.error__value:'');

    return <div className={c.window}>
        <div className={classNameCounter}>{props.error || props.startText || props.value}</div>
        <div className={c.button__wrapper}>
            <Button disable={props.disableInc} onChange={props.onChangeInc}>inc</Button>
            <Button disable={props.disableRes} onChange={props.onReset}>reset</Button>
        </div>
    </div>
}

