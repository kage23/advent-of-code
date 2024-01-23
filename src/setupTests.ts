// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {})
// eslint-disable-next-line @typescript-eslint/no-empty-function
const timeSpy = jest.spyOn(global.console, 'time').mockImplementation(() => {})
const groupSpy = jest
.spyOn(global.console, 'group')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .mockImplementation(() => {})

afterAll(() => {
  logSpy.mockRestore()
  timeSpy.mockRestore()
  groupSpy.mockRestore()
})
