import React, { useContext, useState } from 'react'
import { TwitterPicker } from 'react-color'
import StateContext from '../../StateContext'
import { ColorButton } from '../../agenda.style'

const ColorPicker = props => {
   const { color, setColor } = props
   const { colors } = useContext(StateContext)

   const [displayPicker, setDisplayPicker] = useState(false)

   const handleColorChange = color => {
      setColor(color.hex)
      setDisplayPicker(false)
   }
   return (
      <>
         <ColorButton backcolor={color} onClick={() => setDisplayPicker(value => !value)} fluid>
            {color}
         </ColorButton>
         {displayPicker ? (
            <div style={{ position: 'absolute', zIndex: '2' }}>
               <TwitterPicker color={color} colors={colors} onChange={handleColorChange} />
            </div>
         ) : (
            ''
         )}
      </>
   )
}

export default ColorPicker
