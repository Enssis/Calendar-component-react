import React, { useContext } from 'react'
import { Icon } from 'semantic-ui-react'
import { StyledDropdown } from '../../agenda.style'
import StateContext from '../../StateContext'

const IconDropdown = props => {
   const { Icones } = useContext(StateContext).languageFile.Creation
   //aray of al the icons option and the way they render
   const iconKeys = ['birthday cake', 'coffee', 'phone', 'suitcase', 'hospital', 'plane', 'taxi', 'train', 'utensils', 'exclamation', 'address book']
   const iconsOption = iconKeys.map(key => ({
      key: key,
      value: key,
      text: (
         <>
            <Icon name={key} />
            <span>{Icones[key]}</span>
         </>
      )
   }))
   const { selectedIcon, setSelectedIcon } = props
   return <StyledDropdown button className="icon" defaultValue={selectedIcon} floating labeled options={iconsOption} clearable placeholder={Icones.none} onChange={(_, data) => setSelectedIcon(data.value)} />
}

export default IconDropdown
