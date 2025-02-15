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

function validateRequiredNumber(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/[+-]?([0-9]*[.])?[0-9]+/i.test(value)) {
    error = 'Invalid amount';
  }
  return error;
}

export const AddExpensesFrom = (props) => {
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
      expensesTypeId: '',
      amount: '',
      description: ''
    }}
    onSubmit={props.onFormSubmit}
  >
    {({
      isSubmitting,
      isValid,
      dirty
    }) => (
      <Form>
        <FormField label="Сума" labelFor="amount">
          <Field type="amount" name="amount" placeholder="Amount" validate={validateRequiredNumber}/>
        </FormField>

        <FormField label="Тип" labelFor="expensesTypeId">
          <Field name="expensesTypeId" id="expensesTypeId" component="select" validate={validateRequiredNumber}>
            <option value=""></option>
            {
              items.map((item) => {
                return <option key={item.id} value={item.id}>{item.title}</option>
              })
            }
          </Field>
        </FormField>

        <Divider />

        <FormField label="Примітка" hasTextareaHeight>
          <Field name="description" as="textarea" placeholder="Your text here" />
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

