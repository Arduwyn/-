import type { Block } from 'payload'

/** Case-study card grid with a left-aligned head + a side CTA. (Images/modals come later.) */
export const CaseStudies: Block = {
  slug: 'caseStudies',
  labels: { singular: 'Case Studies', plural: 'Case Studies' },
  fields: [
    { name: 'anchor', type: 'text', admin: { description: 'Optional HTML id for in-page links (e.g. "portfolio").' } },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Case Study', plural: 'Case Studies' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Optional. Upload images first in the Media collection, then pick one here. ~16:10 ratio looks best (e.g. 1200×750). If left blank, the card falls back to a placeholder icon.',
          },
        },
        { name: 'vertical', type: 'text', admin: { description: 'Optional small kicker.' } },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'summary', type: 'textarea', admin: { description: 'Short blurb shown on the card.' } },
        { name: 'ctaLabel', type: 'text', defaultValue: 'View Case Study' },
        // ---- Detail modal content (shown when card is clicked) ----------------
        {
          name: 'lede',
          type: 'textarea',
          admin: { description: 'Modal opening line (shown right under the title in the modal).' },
        },
        {
          name: 'stats',
          type: 'array',
          maxRows: 3,
          labels: { singular: 'Stat', plural: 'Stats' },
          admin: { description: 'Up to 3 highlight stats shown in a row inside the modal.' },
          fields: [
            { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "120K+", "VPN-free", "2+ yrs"' } },
            { name: 'label', type: 'text', required: true, admin: { description: 'Small caption under the value.' } },
          ],
        },
        { name: 'situation', type: 'textarea', admin: { description: 'Modal: the SITUATION paragraph.' } },
        {
          name: 'approach',
          type: 'array',
          labels: { singular: 'Approach Bullet', plural: 'Approach Bullets' },
          admin: { description: 'Modal: the APPROACH bullet list.' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'outcome', type: 'textarea', admin: { description: 'Modal: the OUTCOME paragraph.' } },
      ],
    },
  ],
}
