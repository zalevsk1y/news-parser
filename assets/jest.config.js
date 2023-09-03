module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@news-parser/ui/sidebar/(.*)$': '<rootDir>/src/packages/ui/sidebar/$1.tsx',
        '\\.(css)$': 'identity-obj-proxy',
      },
    
  };
  