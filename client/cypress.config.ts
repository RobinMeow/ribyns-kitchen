/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress'
import { MongoClient } from 'mongodb'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    experimentalRunAllSpecs: true,
    experimentalInteractiveRunEvents: true,
    specPattern: 'cypress/e2e/**/*_{cy,spec}.{js,jsx,ts,tsx}',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      // Replace with your actual  MongoDB connection details
      on('task', {
        async 'db:reset'() {
          const client = new MongoClient('mongodb://127.0.0.1:27017')

          try {
            await client.connect()
            const db = client.db('communitycookbook')
            await db.dropDatabase()
          } catch (error) {
            console.error('Error purging database:', error)
          } finally {
            await client.close()
          }
          return Promise.resolve(null)
        },
        async 'db:seed:recipe'() {
          const client = new MongoClient('mongodb://127.0.0.1:27017')

          try {
            type Recipe = {
              _id: string
              title: string
              createdAt: Date
              __v: number
            }

            await client.connect()
            const db = client.db('communitycookbook')
            const collection = db.collection<Recipe>('recipes')
            await collection.insertOne({
              _id: '2302dbb0-5269-4839-8bfa-b39e8c0b4821',
              __v: 0,
              createdAt: new Date(new Date().toISOString()),
              title: 'Cypress Recipe'
            })
          } catch (error) {
            console.error('Error creating recipe database:', error)
          } finally {
            await client.close()
          }
          return Promise.resolve(null)
        }
      })
    }
  }
})
