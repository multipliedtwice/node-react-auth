import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { UpdateUserInput, UserType } from './types'

export const UserSchema = new mongoose.Schema<UserType>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      validate: {
        validator: (v: string) => /\S+@\S+\.\S+/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    language: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

const blacklistFields = ['password']

UserSchema.methods.toJSON = function toJSON() {
  const doc = this.toObject()
  blacklistFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field]
    }
  })
  return doc
}

UserSchema.pre('save', function Save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10)
  }
  next()
})

UserSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next) {
  const {
    password,
    new_password,
    confirm_password,
    language,
    isPublic,
  } = this.getUpdate() as UpdateUserInput

  // @ts-ignore
  let docToUpdate = await this.model.findOne(this.getFilter())

  if (
    password &&
    new_password &&
    confirm_password &&
    new_password === confirm_password
  ) {
    const isAuthorized = docToUpdate.verifyPassword(password)
    if (isAuthorized) {
      docToUpdate.password = new_password
    } else {
      throw new Error('Unauthorized access')
    }
  }

  if (language && isPublic !== undefined) {
    docToUpdate.language = language
    docToUpdate.isPublic = isPublic
  }

  docToUpdate.save(function (err) {
    if (err) throw new Error('Error during user update')
  })

  // @ts-ignore
  next()
})

UserSchema.methods.verifyPassword = function verifyPassword(password) {
  const result = bcrypt.compareSync(password, this.password)
  return result
}

export const User = mongoose.model<UserType>('User', UserSchema)
