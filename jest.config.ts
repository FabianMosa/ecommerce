import type { Config } from 'jest'
import nextJest from 'next/jest.js'

// Integra Jest con Next para resolver alias, transformaciones SWC y variables de entorno de la app.
const createJestConfig = nextJest({
  // Ruta del proyecto Next para cargar next.config y `.env` en el entorno de pruebas.
  dir: './',
})

// Configuracion explicita de Jest (jsdom para componentes React del App Router).
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Ejecuta solo suites compatibles con Jest para evitar mezclar node:test (.mjs).
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // Extiende expect con matchers de Testing Library antes de cada archivo de prueba.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
