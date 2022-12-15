import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2019/Day22'

const convertToLCF = (instruction: string): [bigint, bigint] => {
  if (instruction.startsWith('deal with')) {
    const increment: bigint = BigInt(parseInt(instruction.split('increment ')[1]))
    return [increment, BigInt(0)]
  } else if (instruction.startsWith('deal into')) {
    return [BigInt(-1), BigInt(-1)]
  } else if (instruction.startsWith('cut')) {
    const cutBy = parseInt(instruction.slice(4))
    return [BigInt(1), BigInt(cutBy * -1)]
  }

  return [BigInt(NaN), BigInt(NaN)]
}

const getNewCardPosition = (origPosition: bigint, deckSize: bigint, shuffleLCF: [bigint, bigint]): bigint => {
  const newPosition = (BigInt(BigInt(shuffleLCF[0]) * BigInt(origPosition)) + BigInt(shuffleLCF[1])) % BigInt(deckSize)

  return newPosition >= 0 ? newPosition : BigInt(deckSize) + BigInt(newPosition)
}

const simplifyInstructions = (instructions: string[], deckSize: bigint): [bigint, bigint] => {
  const originalLCFs = instructions.map(convertToLCF)

  let newLCF = originalLCFs[0]
  for (let i = 1; i < originalLCFs.length; i++) {
    const nextLCF = originalLCFs[i]
    newLCF = [
      (BigInt(newLCF[0]) * BigInt(nextLCF[0])) % BigInt(deckSize),
      ((BigInt(newLCF[1]) * BigInt(nextLCF[0])) + BigInt(nextLCF[1])) % BigInt(deckSize)
    ]
  }

  return newLCF
}

const exponentiationBySquaring__recursive = (x: bigint, y: bigint, m: bigint): bigint => {
  if (y === BigInt(0)) return BigInt(1)
  else if (y === BigInt(1)) return x
  else if (BigInt(y) % BigInt(2) === BigInt(0)) {
    return exponentiationBySquaring__recursive((BigInt(x) * BigInt(x)) % BigInt(m), BigInt(y) / BigInt(2), m)
  } else {
    return BigInt(
      BigInt(x) * BigInt(exponentiationBySquaring__recursive(
        (BigInt(x) * BigInt(x)) % BigInt(m), (BigInt(y) - BigInt(1)) / BigInt(2), BigInt(m)))
    ) % BigInt(m)
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Perform Shuffling Technique (Part 1)',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey]
      const deckSize: bigint = inputKey.startsWith('DEMO') ? BigInt(10) : BigInt(10007)
      const instructionLCF = simplifyInstructions(input.split('\n'), deckSize)

      if (deckSize === BigInt(10)) {
        const newDeck: bigint[] = []
        for (let i = BigInt(0); i < deckSize; i++) {
          newDeck[Number(getNewCardPosition(i, deckSize, instructionLCF))] = i
        }
        console.log('Shuffled demo deck:', newDeck)
        return {}
      }

      return {
        answer1: getNewCardPosition(BigInt(2019), deckSize, instructionLCF).toString()
      }
    }
  },
  {
    label: 'Perform Shuffling Technique (Part 2)',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey]
      const deckSize = BigInt(119315717514047)
      const instructionLCF = simplifyInstructions(input.split('\n'), deckSize)
      const repetitions = BigInt(101741582076661)
      const aToTheK = BigInt(exponentiationBySquaring__recursive(instructionLCF[0], repetitions, deckSize))
      const finalLCF: [bigint, bigint] = [
        aToTheK % deckSize,
        (
          ((BigInt(instructionLCF[1]) * (BigInt(1) - aToTheK)) % deckSize)
          * (
            BigInt(exponentiationBySquaring__recursive(BigInt(1) - BigInt(instructionLCF[0]), deckSize - BigInt(2), deckSize))
            % deckSize
          )
        ) % deckSize
      ]
      const [A, B] = finalLCF
      const x = BigInt(2020)
      const fToTheNegativeKOfX = (
        ((BigInt(x) - BigInt(B)) % deckSize)
        * (BigInt(exponentiationBySquaring__recursive(A, deckSize - BigInt(2), deckSize)) % deckSize)
      ) % deckSize
      return {
        answer2: fToTheNegativeKOfX.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The position of card <code>2019</code> is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The card in position <code>2020</code> is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Slam Shuffle'
}

export default config
