import { Control, FieldValues, UseFormGetFieldState } from 'react-hook-form'

// function choose<U, K extends keyof U>(o: U, propNames: K[]): U[K][] {
//     return propNames.map((n) => o[n])
// }

export interface ReactHookForm {
  control: Control<FieldValues, any>
  // register: UseFormRegister<FieldValues>
  // getValues: UseFormGetValues<FieldValues>
  getFieldState: UseFormGetFieldState<FieldValues>
}

export interface LoginUserInput {
  email?: string
  password?: string
}

export interface CreateUserInput {
  displayName?: string
  email?: string
  password?: string
  passwordControl?: string
}

export interface CreateCategoryInput {
  title?: string
}

export interface CreateActivityInput {
  categoryId?: string
  label?: string
  startDate?: Date
}

export interface CreateTimeRecordInput {
  activityId?: string
  amount?: number
  date?: Date
}
