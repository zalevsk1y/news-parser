module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@news-parser/ui/sidebar/(.*)$': '<rootDir>/src/packages/ui/sidebar/$1.tsx',
        '^@news-parser/helpers/(.*)$': '<rootDir>/src/packages/helpers/$1.ts',
        '^@news-parser/config/(.*)$': '<rootDir>/src/packages/config/$1.ts',
        '\\.(css)$': 'identity-obj-proxy',
      },
    
  };
  