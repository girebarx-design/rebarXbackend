import type { CollectionConfig } from 'payload'

/**
 * City landing pages (/gfrp-rebar-in-<slug>).
 *
 * These only work if each one carries real local substance — named
 * infrastructure, actual soil and climate conditions, local industry. A page
 * that is GFRP boilerplate with the city name swapped in is a doorway page
 * under Google's spam policy, which risks the whole domain rather than just
 * that page. `localContext` and `projects` are required for that reason: if
 * there is nothing true to say about a city, it should not get a page.
 *
 * RebarX manufactures in one place (Pithampur). `logistics` exists so every
 * page states the delivery reality plainly instead of implying a local depot.
 */
const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'state', 'tier', 'published'],
    description: 'City-level landing pages. Each needs genuine local content.',
    group: 'Landing Pages',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text', required: true, admin: { width: '40%' } },
        { name: 'state', type: 'text', required: true, admin: { width: '35%' } },
        {
          name: 'tier',
          type: 'select',
          required: true,
          defaultValue: 'tier-2',
          admin: { width: '25%' },
          options: [
            { label: 'Metro', value: 'metro' },
            { label: 'Tier 1', value: 'tier-1' },
            { label: 'Tier 2', value: 'tier-2' },
            { label: 'Tier 3', value: 'tier-3' },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL segment. Page lives at /gfrp-rebar-in-<slug>.' },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (value) return value
            return (data?.city ?? '')
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
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uncheck to pull the page off the site and out of the sitemap.' },
    },
    {
      name: 'metaTitle',
      type: 'text',
      required: true,
      maxLength: 70,
      admin: { description: 'Browser tab and Google result title. Keep under 60 characters if you can.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: { description: 'The grey text under the Google result. Aim for 150-160 characters.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Opening paragraph. Answer "can I get GFRP rebar in this city" directly in the first sentence — AI search engines quote this.',
      },
    },
    {
      name: 'localContext',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Why THIS city specifically. Soil, climate, water table, coastal salt, industrial chemicals — the real corrosion drivers here. Required: without it the page is a doorway page.',
      },
    },
    {
      name: 'projects',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Project', plural: 'Projects' },
      admin: {
        description: 'Real, named infrastructure in or around this city. Do not invent these.',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'note', type: 'text', required: true, admin: { description: 'One line on why GFRP is relevant to it.' } },
      ],
    },
    {
      name: 'applications',
      type: 'array',
      labels: { singular: 'Application', plural: 'Applications' },
      admin: { description: 'What RebarX is typically used for in this market.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'logistics',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'How delivery actually works to this city from Pithampur. Be straight about it — no implying a local warehouse we do not have.',
      },
    },
    {
      name: 'faqs',
      type: 'array',
      labels: { singular: 'FAQ', plural: 'FAQs' },
      admin: { description: 'City-specific questions. Generic GFRP questions already live on /compare.' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export default Cities
