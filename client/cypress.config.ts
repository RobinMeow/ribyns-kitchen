/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress'
import { MongoClient } from 'mongodb'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    experimentalRunAllSpecs: true,
    experimentalInteractiveRunEvents: true,
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
        }
      })
    }
  }
})
