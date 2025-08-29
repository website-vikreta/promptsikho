import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schema} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Promptsikho',

  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',

  plugins: [deskTool()],

  schema: schema,
})
