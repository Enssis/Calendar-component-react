import React, { useState } from "react"
import { TwitterPicker } from "react-color"
import { ColorButton } from "../calendar.style"

const ColorPicker = props => {
   const [displayPicker, setDisplayPicker] = useState(false)

   return (
      <>
         <ColorButton backcolor={props.color} onClick={() => setDisplayPicker(value => !value)} fluid>
            {props.color}
         </ColorButton>
         {displayPicker ? (
            <div style={{ position: "absolute", zIndex: "2" }}>
               <TwitterPicker color={props.color} colors={["#0ed3ed", "#00c21d"]} onChange={color => props.setColor(color.hex)} />
            </div>
         ) : (
            ""
         )}
      </>
   )
}

export default ColorPicker
