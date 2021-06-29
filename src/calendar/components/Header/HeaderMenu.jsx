import moment from 'moment'
import React, { useContext } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { DAY, MONTH, OPEN_MODAL, SET_MODE, WEEK, CREATE, SETTINGS } from '../../constants'

//context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'

const HeaderMenu = () => {
   const { settings, mode } = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)

   return (
      <Menu inverted secondary>
         <Menu.Item name="Mois" active={mode === MONTH} onClick={() => appDispatch({ type: SET_MODE, data: MONTH })} />
         <Menu.Item name="Semaine" active={mode === WEEK} onClick={() => appDispatch({ type: SET_MODE, data: WEEK })} />
         <Menu.Item name="Jour" active={mode === DAY} onClick={() => appDispatch({ type: SET_MODE, data: DAY })} />
         <Menu.Menu position="right">
            {
               //add icon used to open the create modal only if it's allowed in the settings
               settings.allowCreation ? (
                  <Menu.Item name="add" onClick={() => appDispatch({ type: OPEN_MODAL, mode: CREATE, event: moment() })}>
                     <Icon name="add" />
                  </Menu.Item>
               ) : (
                  ''
               )
            }

            <Menu.Item name="settings" onClick={() => appDispatch({ type: OPEN_MODAL, mode: SETTINGS, event: '' })}>
               <Icon name="setting" />
            </Menu.Item>
         </Menu.Menu>
      </Menu>
   )
}

export default HeaderMenu
