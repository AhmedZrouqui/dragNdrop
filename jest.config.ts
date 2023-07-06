export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__mocks__/files.ts',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
