interface IYearConfig {
  year: number
  days: number[]
}

export const YEARS: IYearConfig[] = [
  {
    year: 2018,
    days: [1, 2, 3, 4, 5, 6]
  },
  {
    year: 2017,
    days: [1, 2, 3]
  },
  {
    year: 2016,
    days: [1, 2, 3, 4]
  }
]