import { mdiAccount, mdiCheckCircle, mdiGithub, mdiMail, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useRef, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBox/Component/Empty'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
// import TableSampleClients from '../components/Table/SampleClients'
import { ExpensesTable, AddExpensesFrom } from '../components/Expenses'
import { addExpenses } from './api/expenses'

import { getPageTitle } from '../config'
import Link from 'next/link'
import CardBoxModal from '../components/CardBox/Modal'
import { Form, Field, Formik } from 'formik'
import Buttons from '../components/Buttons'
import Divider from '../components/Divider'
import FormField from '../components/Form/Field'


const TablesPage = () => {
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef(null)

  function openModal() {
    setIsModalInfoActive(true)
  }

  function closeModal() {
    setIsModalInfoActive(false)
  }

  function addNewExpense(data) {
    addExpenses(data).then(() => {
      setIsModalInfoActive(false)
      window.location.reload()
    }).catch((err) => {
      setError(err)
    })
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Expenses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Expenses" main>
          {/* <Button
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          /> */}
            <Button label={'Новий документ'} color={'info'} onClick={openModal} />
        </SectionTitleLineWithButton>

        {/* <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar> */}

        <CardBox className="mb-6" hasTable>
          <ExpensesTable />
        </CardBox>

        <CardBoxModal
          title="Please confirm action"
          buttonColor="info"
          buttonLabel="Confirm"
          isActive={isModalInfoActive}
          onCancel={closeModal}
        >
        <AddExpensesFrom onFormSubmit={addNewExpense} onFormClose={closeModal}/> 
      </CardBoxModal>

      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
