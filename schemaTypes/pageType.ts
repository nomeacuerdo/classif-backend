import { defineField, defineType } from 'sanity';
import { ImageIcon, BillIcon } from '@sanity/icons';
import { MoneyInput } from './components/MoneyInput';

export const pageType = defineType({
  name: 'page',
  title: 'Content Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page title',
      validation: (rule) => rule
        .required()
        .error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule
        .required()
        .error(`Required to generate a page on the website`),
      hidden: ({document}) => !document?.title,
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', icon: ImageIcon },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({title}) {
      const titleFormatted = title || 'No Title :|';
      return {
        title: titleFormatted,
      }
    },
  },
})