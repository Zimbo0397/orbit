import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
// import { useSampleClients } from '../../hooks/sampleData'
import { Expense } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import { getPaymentsTypes } from '../../pages/api/payments'
import { getAreas } from '../../pages/api/areas'
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

export const AddPaymentsFrom = (props) => {
  // const { clients } = useSampleClients()
  const [ types, setTypes ] = React.useState([])
  const [ areas, setAreas ] = React.useState([])

  React.useEffect(() => {
    getPaymentsTypes().then((res) => {
      setTypes(res)
    })

    getAreas().then((res) => {
      setAreas(res)
    })
  }, []);


  return (
    <Formik
    initialValues={{
      amount: '',
      payment_type_id: '',
      area_id: ''
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

        <FormField label="Тип" labelFor="payment_type_id">
          <Field name="payment_type_id" id="payment_type_id" component="select" validate={validateRequiredNumber}>
            <option value=""></option>
            {
              types.map((item) => {
                return <option key={item.id} value={item.id}>{item.title}</option>
              })
            }
          </Field>
        </FormField>

        <Divider />

        <FormField label="Ділянка" labelFor="area_id">
          <Field name="area_id" id="area_id" component="select" validate={validateRequiredNumber}>
            <option value=""></option>
            {
              areas.map((item) => {
                return <option key={item.id} value={item.id}>{item.address}</option>
              })
            }
          </Field>
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

