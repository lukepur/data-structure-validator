# data-structure-validator

## Example constraint configuration
```
const configuration = [
  {
    id: 'personal',
    children: [
      {
        id: 'title',
        type: 'string', // One day, 'enum'?
        required: true
      },
      {
        id: 'first_name',
        type: 'string' // One day, 'enum'?
      },
      {
        id: 'last_name',
        type: 'string',
        required: {
          fn: isEmpty,
          args: ['$.personal.first_name'],
          message: '$prop is required if first_name is empty'
        }
      },
      {
        id: 'contacts',
        type: 'array',
        validations: [
          {
            fn: 'minArrayLength',
            args: ['$value', 2],
            message: 'At least 2 contacts must be provided
          }
        ],
        children: { // children is object instead of array for array types
          children: [ // implicit object type
            {
              id: 'contact_type',
              type: 'string',
              required: true,
              validations: [
                {
                  fn: 'oneOf',
                  args: ['$value', ['phone', 'email', 'address']],
                  message: '$prop must be phone, email or address'
                }
              ]
            },
            {
              id: 'email',
              type: 'string',
              required: {
                fn: 'equals',
                args: ['$.personal.contacts.^.contact_type', 'email'],
                message: 'email is required'
              }
            }
          ]
        }
      }
    ]
  }
];
```
