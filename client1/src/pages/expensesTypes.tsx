import { mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBox/Component/Empty'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
// import TableSampleClients from '../components/Table/SampleClients'
import { ExpensesTypesTable } from '../components/ExpensesTypes/ExpensesTypesTable'

import { getPageTitle } from '../config'
import CardBoxModal from '../components/CardBox/Modal'
import { AddExpensesTypeForm } from '../components/Expenses/AddExpensesTypeForm'
import { addExpensesType } from './api/expenses'


const TablesPage = () => {
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)

  function openModal() {
    setIsModalInfoActive(true)
  }

  function closeModal() {
    setIsModalInfoActive(false)
  }

  function addNewExpenseType(data) {
    addExpensesType(data).then(() => {
      setIsModalInfoActive(false)
      window.location.reload()
    }).catch((err) => {
    })
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Expenses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="ExpensesTypes" main>
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
          <ExpensesTypesTable />
        </CardBox>

        <CardBoxModal
          title="Please confirm action"
          buttonColor="info"
          buttonLabel="Confirm"
          isActive={isModalInfoActive}
          onCancel={closeModal}
        >
        <AddExpensesTypeForm onFormSubmit={addNewExpenseType} onFormClose={closeModal}/> 
      </CardBoxModal>

      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
