// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {})
// eslint-disable-next-line @typescript-eslint/no-empty-function
const groupSpy = jest
  .spyOn(global.console, 'group')
  .mockImplementation(() => {})

afterAll(() => {
  logSpy.mockRestore()
  groupSpy.mockRestore()
})
