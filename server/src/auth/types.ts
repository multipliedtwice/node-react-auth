import mongoose from 'mongoose'

export type CreateUserInputBody = {
  user: CreateUserInput
}

export type SignInUserInputBody = {
  credentials: SignInUserInput
}

export type UserLanguages = 'en' | 'fr' | 'de' | 'ja' | 'zh' | 'ko' | 'th'

export type CreateUserInput = {
  email: string
  password: string
  repeat_password: string
  language: UserLanguages
}

export type UpdateUserInput = {
  isPublic?: boolean
  language?: UserLanguages
  password?: string
  new_password?: string
  confirm_password?: string
}

export type SignInUserInput = {
  email: string
  password: string
}

export interface UserType extends mongoose.Document {
  email: string
  password: string
  isPublic: boolean
  language: UserLanguages
  setPassword(password: string): void
  validPassword(password: string): void
}
