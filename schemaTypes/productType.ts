import { defineField, defineType } from 'sanity';
import { ImageIcon, BillIcon } from '@sanity/icons';
import { MoneyInput } from './components/MoneyInput';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Product name',
      validation: (rule) => rule
        .required()
        .error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule
        .required()
        .error(`Required to generate a page on the website`),
      hidden: ({document}) => !document?.name,
    }),
    defineField({
      title: "Product images",
      name: "images",
      type: "array",
      of: [{ type: "image", icon: ImageIcon }],
      description: "pics or it didn't happen",
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'price',
      description: 'Precio en fokin lucas',
      type: 'number',
      icon: BillIcon,
      initialValue: 0,
      components: {
        input: MoneyInput
      }
    }),
    defineField({
      name: 'negociable',
      type: 'boolean',
      description: "Check if the price can be negoshiashed",
      options: {
        // list: ['Yes', 'No'],
        layout: 'switch',
      },
    }),
    defineField({
      name: 'published',
      type: 'boolean',
      description: "Activate it to show it on the site",
      options: {
        // list: ['Yes', 'No'],
        layout: 'switch',
      },
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
      title: "name",
      subtitle: "price",
      images: "images",
      negociable: "negociable",
    },
    prepare({title, subtitle, images, negociable}) {
      const titleFormatted = title || 'No Name :|';
      const priceFormatted = subtitle.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      const finalPrice = negociable ? `${priceFormatted} (negociable)` : priceFormatted;

      return {
        title: titleFormatted,
        subtitle: finalPrice,
        media: images && images.length > 0 ? images[0] : ImageIcon,
        negociable,
      }
    },
  },
})