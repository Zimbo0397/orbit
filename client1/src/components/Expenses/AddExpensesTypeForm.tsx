import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
// import { useSampleClients } from '../../hooks/sampleData'
import { Expense } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import { getExpensesTypes } from '../../api/expenses-types'
import { Formik, Form, Field } from 'formik'
import expenses from '../../pages/expenses'
import Divider from '../Divider'
import FormField from '../Form/Field'

// function validateType(value) {
//   let error;
//   if (!value) {
//     error = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//     error = 'Invalid email address';
//   }
//   return error;
// }

function validateRequired(value) {
  let error;
  if (!value) {
    error = 'Required';
  }

  return error;
}

export const AddExpensesTypeForm = (props) => {
  // const { clients } = useSampleClients()
  const [ items, setItems ] = React.useState([])

  React.useEffect(() => {
    getExpensesTypes().then((res) => {
      setItems(res)
    })
    
  }, []);


  return (
    <Formik
    initialValues={{
      title: ''
    }}
    onSubmit={props.onFormSubmit}
  >
    {({
      isSubmitting,
      isValid,
      dirty
    }) => (
      <Form>
        <FormField label="Назва" labelFor="title">
          <Field type="title" name="title" placeholder="Type" validate={validateRequired}/>
        </FormField>

        <Divider />

        <Buttons>
          <Button type="submit" color="info" label="Додати" disabled={isSubmitting || !isValid || !dirty} />
          <Button type="reset" color="info" outline label="Закрити" onClick={props.onFormClose}/>
        </Buttons>
      </Form>
    )}
  </Formik>
  )
}

