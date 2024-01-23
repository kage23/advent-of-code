import inputs from '../../inputs/2019/day22'
import { DayConfig } from '../../routes/Day'

const convertToLCF = (instruction: string): [bigint, bigint] => {
  if (instruction.startsWith('deal with')) {
    const increment = BigInt(parseInt(instruction.split('increment ')[1]))
    return [increment, BigInt(0)]
  } else if (instruction.startsWith('deal into')) {
    return [BigInt(-1), BigInt(-1)]
  } else if (instruction.startsWith('cut')) {
    const cutBy = parseInt(instruction.slice(4))
    return [BigInt(1), BigInt(cutBy * -1)]
  }

  return [BigInt(NaN), BigInt(NaN)]
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

const getNewCardPosition = (origPosition: bigint, deckSize: bigint, shuffleLCF: [bigint, bigint]): bigint => {
  const newPosition = (BigInt(BigInt(shuffleLCF[0]) * BigInt(origPosition)) + BigInt(shuffleLCF[1])) % BigInt(deckSize)

  return newPosition >= 0 ? newPosition : BigInt(deckSize) + BigInt(newPosition)
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

export const shuffle1 = (input: string, deckSize = BigInt(10007)) => {
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

export const shuffle2 = (input: string) => {
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

const day22: Omit<DayConfig, 'year'> = {
  answer1Text: 'The position of card 2019 is answer.',
  answer2Text: 'The card in position 2020 is answer.',
  buttons: [
    {
      label: 'Perform Shuffling Technique (Part 1)',
      onClick: shuffle1
    },
    {
      label: 'Perform Shuffling Technique (Part 2)',
      onClick: shuffle2
    },
  ],
  id: 22,
  inputs,
  title: 'Slam Shuffle',
}

export default day22
