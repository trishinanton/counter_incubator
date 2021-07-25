import React, {ChangeEvent,MouseEvent} from "react";
import c from "./Button.module.css"

type PropsBtn = {
    disable: boolean
    onChange: (event:MouseEvent<HTMLButtonElement>)=>void
    children: string
}
export function Button(props: PropsBtn) {
    return <button className={c.button} disabled={props.disable} onClick={props.onChange}>{props.children}</button>
}