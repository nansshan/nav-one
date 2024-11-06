import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import website from './schemas/website'
import category from './schemas/category'

export default defineConfig({
  name: 'default',
  title: 'nav-one-sanity',

  projectId: '0muzcmh8',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [website,category],
  },
})
