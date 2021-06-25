import moment from "moment"
import React, { useContext } from "react"
import { Icon, Menu } from "semantic-ui-react"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"

const HeaderMenu = props => {
   const appState = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)
   const { settings } = appState

   const activeItem = appState.mode

   const handleItemClick = (e, { name }) => {
      const type = "show" + name
      appDispatch({ type })
   }

   return (
      <Menu inverted secondary>
         <Menu.Item name="Mois" active={activeItem === "mois"} onClick={handleItemClick} />
         <Menu.Item name="Semaine" active={activeItem === "semaine"} onClick={handleItemClick} />
         <Menu.Item name="Jour" active={activeItem === "jour"} onClick={handleItemClick} />
         <Menu.Menu position="right">
            {settings.allowCreation ? (
               <Menu.Item name="add" active={activeItem === "add"} onClick={() => appDispatch({ type: "openModal", mode: "create", event: moment() })}>
                  <Icon name="add" />
               </Menu.Item>
            ) : (
               ""
            )}

            <Menu.Item name="settings" active={activeItem === "settings"} onClick={() => alert("settings")}>
               <Icon name="setting" />
            </Menu.Item>
         </Menu.Menu>
      </Menu>
   )
}

export default HeaderMenu
