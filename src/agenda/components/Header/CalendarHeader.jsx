import React, { useContext } from 'react'
import { Grid, Header, Image, Segment } from 'semantic-ui-react'
import StateContext from '../../StateContext'
import HeaderMenu from './HeaderMenu'

const CalendarHeader = props => {
   const { title } = useContext(StateContext).settings

   return (
      <Grid celled style={{ marginTop: 0 }}>
         <Grid.Column width={10} color="blue">
            <Segment color="blue" inverted textAlign="center">
               <Header as="h1">
                  {title.hasLogo ? <Image src={title.logoPath} /> : ''} {title.isImage ? <Image src={title.value} size="small" /> : <>{title.value}</>}
               </Header>
            </Segment>
         </Grid.Column>
         <Grid.Column width={6} color="blue">
            <Segment color="blue" inverted textAlign="center">
               <HeaderMenu />
            </Segment>
         </Grid.Column>
      </Grid>
   )
}

export default CalendarHeader
