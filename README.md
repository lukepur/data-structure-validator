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
      }
    ]
  }
];
```