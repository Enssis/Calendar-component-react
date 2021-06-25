import React, { useContext } from "react"
import { Button, Icon } from "semantic-ui-react"
import DispatchContext from "../../DispatchContext"

const DateTraveler = props => {
   const appDispatch = useContext(DispatchContext)

   const changeDate = nbDays => {
      return () => appDispatch({ type: props.addType, nbDays: nbDays * props.daysMove })
   }

   return (
      <Button.Group>
         <Button icon onClick={changeDate(-10)}>
            <Icon name="angle double left" />
         </Button>
         <Button icon onClick={changeDate(-5)}>
            <Icon name="angle left" />
         </Button>
         <Button onClick={changeDate(-1)}>{props.last}</Button>
         <Button>{props.actual}</Button>
         <Button onClick={changeDate(1)}>{props.next}</Button>
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
