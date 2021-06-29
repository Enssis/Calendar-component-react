import React, { useContext } from 'react'

//components
import { Button, Icon } from 'semantic-ui-react'

//context
import DispatchContext from '../../DispatchContext'

const DateTraveler = props => {
   const { addType, daysMove, last, next, actual } = props
   const appDispatch = useContext(DispatchContext)

   //change the date displayed by adding the right amount of days / month
   const changeDate = nbDays => {
      return () => appDispatch({ type: addType, nbDays: nbDays * daysMove })
   }

   return (
      <Button.Group>
         <Button icon onClick={changeDate(-10)}>
            <Icon name="angle double left" />
         </Button>
         <Button icon onClick={changeDate(-5)}>
            <Icon name="angle left" />
         </Button>
         <Button onClick={changeDate(-1)}>{last}</Button>
         <Button>{actual}</Button>
         <Button onClick={changeDate(1)}>{next}</Button>
         <Button icon onClick={changeDate(5)}>
            <Icon name="angle right" />
         </Button>
         <Button icon onClick={changeDate(10)}>
            <Icon name="angle double right" />
         </Button>
      </Button.Group>
   )
}

export default DateTraveler
