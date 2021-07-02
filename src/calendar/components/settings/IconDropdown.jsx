import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'

const IconDropdown = props => {
   const { selectedIcon, setSelectedIcon } = props
   return <Dropdown button className="icon" defaultValue={selectedIcon} floating labeled options={iconsOption} clearable placeholder="Aucune Icone" onChange={(_, data) => setSelectedIcon(data.value)} />
}

export default IconDropdown

//aray of al the icons option and the way they render
const iconsOption = [
   {
      key: 'birthday cake',
      value: 'birthday cake',
      text: (
         <>
            <Icon name="birthday cake" />
            <span>Anniversaire</span>
         </>
      )
   },
   {
      key: 'coffee',
      value: 'coffee',
      text: (
         <>
            <Icon name="coffee" />
            <span>Café</span>
         </>
      )
   },
   {
      key: 'phone',
      value: 'phone',
      text: (
         <>
            <Icon name="phone" />
            <span>Téléphone</span>
         </>
      )
   },
   {
      key: 'suitcase',
      value: 'suitcase',
      text: (
         <>
            <Icon name="suitcase" />
            <span>Voyage</span>
         </>
      )
   },
   {
      key: 'hospital',
      value: 'hospital',
      text: (
         <>
            <Icon name="hospital" />
            <span>Hopital</span>
         </>
      )
   },
   {
      key: 'plane',
      value: 'plane',
      text: (
         <>
            <Icon name="plane" />
            <span>Avion</span>
         </>
      )
   },
   {
      key: 'taxi',
      value: 'taxi',
      text: (
         <>
            <Icon name="taxi" />
            <span>Taxi</span>
         </>
      )
   },
   {
      key: 'train',
      value: 'train',
      text: (
         <>
            <Icon name="train" />
            <span>Train</span>
         </>
      )
   },
   {
      key: 'utensils',
      value: 'utensils',
      text: (
         <>
            <Icon name="utensils" />
            <span>Repas</span>
         </>
      )
   },
   {
      key: 'exclamation',
      value: 'exclamation',
      text: (
         <>
            <Icon name="exclamation" />
            <span>Important</span>
         </>
      )
   },
   {
      key: 'address book',
      value: 'address book',
      text: (
         <>
            <Icon name="address book" />
            <span>Contact</span>
         </>
      )
   }
]
