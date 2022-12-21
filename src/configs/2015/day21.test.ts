import { runFight } from './day21'

describe('2015 Day 21', () => {
  it('should run the fight correctly', () => {
    expect(
      runFight([
        { armor: 5, damage: 5, hitPoints: 8},
        { armor: 2, damage: 7, hitPoints: 12 }
      ])
    ).toBeTruthy()
  })
})
