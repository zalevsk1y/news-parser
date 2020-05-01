module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@news-parser/ui/(.*)$': '<rootDir>/src/packages/ui/$1',
        '^@news-parser/entities/(.*)$': '<rootDir>/src/packages/entities/$1',
        '^@news-parser/helpers/(.*)$': '<rootDir>/src/packages/helpers/$1',
        '^@news-parser/config/(.*)$': '<rootDir>/src/packages/config/$1',
        '\\.(css)$': 'identity-obj-proxy',
      },
    
  };
  