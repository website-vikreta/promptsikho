import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'prompt',
  title: 'Prompt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(100),
      description: 'Name of the prompt template'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'prompt',
      title: 'Prompt Text',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
      description: 'The actual prompt template text'
    }),
    defineField({
      name: 'useCase',
      title: 'Use Case',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
      description: 'Description of when and how to use this prompt'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Marketing', value: 'Marketing'},
          {title: 'Coding', value: 'Coding'},
          {title: 'Writing', value: 'Writing'},
          {title: 'Business', value: 'Business'},
          {title: 'Design', value: 'Design'}
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
    }),
    defineField({
      name: 'dateAdded',
      title: 'Date Added',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isFavorite',
      title: 'Is Favorite',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show this prompt in featured sections'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      description: 'useCase'
    }
  }
})
