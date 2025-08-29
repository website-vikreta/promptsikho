import { type SchemaTypeDefinition } from 'sanity'
import prompt from './prompt'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [prompt],
}
