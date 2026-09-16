import type { CollectionConfig } from 'payload'

/**
 * Site albums for the /applications page — one document per project, many
 * photos each. Kapil adds these over time from the admin panel.
 *
 * Photos are plain `media` uploads: alt text and caption already live on the
 * Media collection and are required there, so they are not duplicated here.
 */
const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'city', 'state', 'date'],
    description: 'Photo albums of real sites where RebarX was used.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Site or customer name, e.g. "Industrial Shed, Ankleshwar".',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL segment, lowercase with dashes, e.g. "industrial-shed-ankleshwar".',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (value) return value
            return (data?.title ?? '')
              .toLowerCase()
              .trim()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '')
              .replace(/-{2,}/g, '-')
              .replace(/^-+|-+$/g, '')
          },
        ],
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        description: 'Roughly when the work was done. Newest albums show first.',
        date: { pickerAppearance: 'monthOnly' },
      },
    },
    {
      name: 'elements',
      type: 'select',
      hasMany: true,
      required: true,
      admin: {
        description: 'Which parts of the structure used RebarX.',
      },
      options: [
        { label: 'Slab', value: 'slab' },
        { label: 'Columns', value: 'columns' },
        { label: 'Beams', value: 'beams' },
        { label: 'Boundary / Retaining Wall', value: 'wall' },
        { label: 'Foundation', value: 'foundation' },
        { label: 'Road / Pavement', value: 'pavement' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Two or three sentences on what was built and what RebarX did in it.',
      },
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: {
        description: 'Drag to reorder. The first photo is used as the album cover.',
      },
    },
  ],
}

export default Applications
