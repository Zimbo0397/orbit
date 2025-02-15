export type UserPayloadObject = {
  name: string
  email: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Expense = {
  id: number
  title: string
  amount: string
  description: string
  created_at: string
}

export type ExpenseType = {
  id: number
  title: string
}

export type Payment = {
  id: number
  amount: string
  address: string
  created_at: string
  title: string
}

export type PaymentType = {
  id: number
  title: string
}

export type Role = {
  id: number
  name: string
  created_at: string
}

export type Area = {
  id: number
  address: string
  electricity_meter: string
}

export type Income = {
  amount: string
  created_at: string
  title: string
  address: string
}


export type User = {
  id: number
  email: string
  phone: string
  phone2: string
  role: string
  created_at: string
}

export type UserForm = {
  name: string
  email: string
}
