/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress'
import { MongoClient } from 'mongodb'
import { assert } from './src/app/common/assertions/assert'

export default defineConfig({
  env: {
    apiBaseUrl: 'http://localhost:5126',
    baseUrl: 'http://localhost:4200'
  },
  e2e: {
    baseUrl: 'http://localhost:4200',
    experimentalRunAllSpecs: true,
    specPattern: 'cypress/e2e/**/*{cy,spec}.{js,jsx,ts,tsx}',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      on('task', {
        async 'db:reset'() {
          const client = new MongoClient('mongodb://127.0.0.1:27017')

          try {
            await client.connect()
            const db = client.db('ribyns-kitchen')
            await db.dropDatabase()
          } catch (error) {
            console.error('Error purging database:', error)
          } finally {
            await client.close()
          }
          return Promise.resolve(null)
        },
        async 'db:seed:recipe'({ id, title }) {
          assert(id && typeof id === 'string', 'Id required to create recipe.')
          assert(
            title && typeof title === 'string',
            'Title required to create recipe.'
          )

          const client = new MongoClient('mongodb://127.0.0.1:27017')

          try {
            type Recipe = {
              _id: string
              title: string
              createdAt: Date
              __v: number
            }

            await client.connect()
            const db = client.db('ribyns-kitchen')
            const collection = db.collection<Recipe>('recipes')
            await collection.insertOne({
              _id: id,
              __v: 0,
              createdAt: new Date(new Date().toISOString()),
              title: title
            })
          } catch (error) {
            console.error(
              `Failed to see recipe with id '${id}' and title '${title}'.`,
              error
            )
          } finally {
            await client.close()
          }
          return Promise.resolve(null)
        }
      })
    }
  }
})
