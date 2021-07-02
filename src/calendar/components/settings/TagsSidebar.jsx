import React, { useContext, useEffect, useState } from 'react'
import { Header, Sidebar, Segment, Icon, Grid, Divider, Button, Checkbox, Label } from 'semantic-ui-react'
import { useImmer } from 'use-immer'
import { CLOSE_TAGS, SET_ACTIVE_TAG, SET_TAGS } from '../../constants'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import { MargedIcon } from '../calendar.style'

const TagsSidebar = () => {
   const { tagsOpen, settings, activeTags } = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)

   const [checkedTags, setCheckedTags] = useImmer(activeTags)

   const [tagsList, setTagsList] = useImmer(settings.tagsList)

   const handleClose = () => {
      appDispatch({ type: CLOSE_TAGS })
   }

   const handleCheckboxChange = (key, data) =>
      setCheckedTags(draft => {
         if (data.checked) draft[key] = tagsList[key]
         else delete draft[key]
      })

   const handleDeleteTag = key => {
      setTagsList(draft => {
         delete draft[key]
      })
   }

   const handleValidate = () => {
      appDispatch({ type: SET_ACTIVE_TAG, value: checkedTags })
      appDispatch({ type: SET_TAGS, value: tagsList })
      appDispatch({ type: CLOSE_TAGS })
   }

   useEffect(() => {
      setCheckedTags(activeTags)
      setTagsList(settings.tagsList)
   }, [tagsOpen])

   return (
      <Sidebar animation="overlay" as={Segment} inverted visible={tagsOpen} direction="right" vertical onHide={handleClose} width="wide">
         <Grid container style={{ padding: '15px' }}>
            <Grid.Row>
               <Header inverted as="h3">
                  <Icon name="tags" /> Tags actifs
               </Header>
            </Grid.Row>
            <Divider />
            {Object.entries(tagsList).map(([key, tag]) => (
               <Grid.Row key={key}>
                  <Label inverted image as="a" color={tag.color} onClick={() => handleDeleteTag(key)}>
                     <MargedIcon name="cancel" />
                     <Label.Detail>{tag.name}</Label.Detail>
                  </Label>
                  <Checkbox style={{ paddingLeft: '10px', paddingTop: 4 }} onChange={(_, data) => handleCheckboxChange(key, data)} checked={checkedTags[key] !== undefined} />
               </Grid.Row>
            ))}

            <Divider />
            <Grid.Row>
               <Button positive onClick={handleValidate}>
                  Valider
               </Button>
               <Button negative onClick={handleClose}>
                  Annuler
               </Button>
            </Grid.Row>
         </Grid>
      </Sidebar>
   )
}

export default TagsSidebar
