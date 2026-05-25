import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    // Email + password are added automatically by `auth: true`.
    // Role-based access control will be added when we model editable content.
  ],
}
