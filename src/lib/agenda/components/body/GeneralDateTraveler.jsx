import React, { useContext } from 'react'

//components
import { Button, Icon } from 'semantic-ui-react'

//context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'

const DateTraveler = props => {
   const { addType, daysMove, last, next, actual } = props
   const appDispatch = useContext(DispatchContext)
   const { travelerColor } = useContext(StateContext).theme
   const colorList = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
   //change the date displayed by adding the right amount of days / month
   const changeDate = nbDays => {
      return () => appDispatch({ type: addType, nbDays: nbDays * daysMove })
   }
   const color = colorList.indexOf(travelerColor) >= 0 ? travelerColor : null
   return (
      <Button.Group>
         <Button color={color} icon onClick={changeDate(-10)}>
            <Icon name="angle double left" />
         </Button>
         <Button color={color} icon onClick={changeDate(-5)}>
            <Icon name="angle left" />
         </Button>
         <Button color={color} onClick={changeDate(-1)}>
            {last}
         </Button>
         <Button color={color}>{actual}</Button>
         <Button color={color} onClick={changeDate(1)}>
            {next}
         </Button>
         <Button color={color} icon onClick={changeDate(5)}>
            <Icon name="angle right" />
         </Button>
         <Button color={color} icon onClick={changeDate(10)}>
            <Icon name="angle double right" />
         </Button>
      </Button.Group>
   )
}

export default DateTraveler
