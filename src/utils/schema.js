import * as yup from 'yup'

export const urlItemSchema = yup.object({
  originalUrl: yup.string().url('Enter a valid URL').required('URL is required'),
  validityMinutes: yup
    .number()
    .typeError('Validity must be an integer')
    .integer('Validity must be an integer')
    .min(1, 'Minimum 1 minute')
    .max(1440, 'Max 1440 minutes')
    .optional(),
  preferredCode: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Alphanumeric only')
    .max(20, 'Up to 20 chars')
    .optional()
})
