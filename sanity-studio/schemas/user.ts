export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule: any) => Rule.required().email(),
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'image',
        title: 'Profile Image',
        type: 'url',
      },
      {
        name: 'providerId',
        title: 'Provider ID',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'provider',
        title: 'Provider',
        type: 'string',
        options: {
          list: [
            { title: 'Google', value: 'google' },
            { title: 'GitHub', value: 'github' },
            { title: 'Credentials', value: 'credentials' },
          ],
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'updatedAt',
        title: 'Updated At',
        type: 'datetime',
        validation: (Rule: any) => Rule.required(),
      },
    ],
    indexes: [
      {
        name: 'email',
        fields: ['email'],
      },
    ],
  }