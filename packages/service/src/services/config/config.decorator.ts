import { Transform } from 'class-transformer'

const booleanMapper = new Map([
  ['true', true],
  ['false', false],
  ['1', true],
  ['0', false],
])

export const ToBoolean = () => {
  return Transform(({ value }) => {
    return !!booleanMapper.get(value as string)
  })
}
