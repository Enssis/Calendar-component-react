import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'
import { ColorButton } from '../calendar.style'

const colors = ['#0ed3ed', '#00c21d', '#ff87c3', '#ffd438', '#ff1c14', '#ff7919', '#0055ff', '#cc00ff']

const ColorPicker = props => {
   const { color, setColor } = props

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
