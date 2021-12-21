import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { manhattanDistance } from '../utils/Various'

import INPUT from './Input/Day19'

const orientPoint = (
  [x, y, z]: [x: number, y: number, z: number],
  orientation: number
): [number, number, number] => {
  switch (orientation) {
    case 0:
      return [x, y, z]
    case 1:
      return [x, z, y]
    case 2:
      return [y, x, z]
    case 3:
      return [y, z, x]
    case 4:
      return [z, x, y]
    case 5:
      return [z, y, x]
    case 6:
      return [x, y, z * -1]
    case 7:
      return [x, z, y * -1]
    case 8:
      return [y, x, z * -1]
    case 9:
      return [y, z, x * -1]
    case 10:
      return [z, x, y * -1]
    case 11:
      return [z, y, x * -1]
    case 12:
      return [x, y * -1, z]
    case 13:
      return [x, z * -1, y]
    case 14:
      return [y, x * -1, z]
    case 15:
      return [y, z * -1, x]
    case 16:
      return [z, x * -1, y]
    case 17:
      return [z, y * -1, x]
    case 18:
      return [x, y * -1, z * -1]
    case 19:
      return [x, z * -1, y * -1]
    case 20:
      return [y, x * -1, z * -1]
    case 21:
      return [y, z * -1, x * -1]
    case 22:
      return [z, x * -1, y * -1]
    case 23:
      return [z, y * -1, x * -1]
    case 24:
      return [x * -1, y, z]
    case 25:
      return [x * -1, z, y]
    case 26:
      return [y * -1, x, z]
    case 27:
      return [y * -1, z, x]
    case 28:
      return [z * -1, x, y]
    case 29:
      return [z * -1, y, x]
    case 30:
      return [x * -1, y, z * -1]
    case 31:
      return [x * -1, z, y * -1]
    case 32:
      return [y * -1, x, z * -1]
    case 33:
      return [y * -1, z, x * -1]
    case 34:
      return [z * -1, x, y * -1]
    case 35:
      return [z * -1, y, x * -1]
    case 36:
      return [x * -1, y * -1, z]
    case 37:
      return [x * -1, z * -1, y]
    case 38:
      return [y * -1, x * -1, z]
    case 39:
      return [y * -1, z * -1, x]
    case 40:
      return [z * -1, x * -1, y]
    case 41:
      return [z * -1, y * -1, x]
    case 42:
      return [x * -1, y * -1, z * -1]
    case 43:
      return [x * -1, z * -1, y * -1]
    case 44:
      return [y * -1, x * -1, z * -1]
    case 45:
      return [y * -1, z * -1, x * -1]
    case 46:
      return [z * -1, x * -1, y * -1]
    case 47:
      return [z * -1, y * -1, x * -1]
    default:
      throw new Error('nope')
  }
}

const findAllBeaconsAndScanners = (scannerSetsOfBeacons: [number, number, number][][]): {
  allBeacons: Set<string>
  scanners: [number, number, number, number][]
} => {
  const distanceMapsPerScanner = scannerSetsOfBeacons.map(s =>
    s.map((beaconA, i, beaconList) => {
      const beaconDistances: number[] = []
      for (let j = 0; j < beaconList.length; j++) {
        if (i !== j) {
          const beaconB = beaconList[j]
          beaconDistances.push(manhattanDistance(beaconA, beaconB))
        }
      }
      return beaconDistances
    })
  )
  const scannerPositionsAndOrientations: ([number, number, number, number] | undefined)[] = scannerSetsOfBeacons.map(
    (_, i) => i === 0 ? [0, 0, 0, 0] : undefined
  )
  // The key for this is in the form `${scannerIndex},${beaconIndex}`
  const beaconCorrespondenceMap: Map<string, string[]> = new Map()
  const definitiveBeacons: Set<string> = new Set(scannerSetsOfBeacons[0].map(b => JSON.stringify(b)))
  const whichScannersAreDefinitivelyMapped = [0]
  const definitivelyMappedScannerSetsOfBeacons = scannerSetsOfBeacons.map((s, i) =>
    i === 0 ? s : undefined
  )
  const scannerOverlapMap: Map<string, [
    [number, number, number][],
    [number, number, number][]
  ]> = new Map()
  const whatScannerOverlapsWithWhatOtherScanner: number[][] = scannerSetsOfBeacons.map(() => ([]))
  for (let i = 0; i < distanceMapsPerScanner.length; i++) {
    // For each beacon in Scanner I, the distance from that beacon to every other beacon
    const scannerSetI = scannerSetsOfBeacons[i]
    const distanceMap = distanceMapsPerScanner[i]
    for (let j = 0; j < distanceMapsPerScanner.length; j++) {
      if (j !== i) {
        const scannerSetJ = scannerSetsOfBeacons[j]
        // For each beacon in Scanner J, the distance from that beacon to every other beacon
        const comparisonDistanceMap = distanceMapsPerScanner[j]
        // Scanner I and Scanner J overlap if they share 12 beacons
        // That means they overlap if there are 12 items in distanceMap for which
        // there are corresponding items in comparisonMap. If an item in distanceMap
        // shares exactly 11 distances with an item in comparisonMap, those items correspond.
        const correspondingItemsArrays: [
          [number, number, number][],
          [number, number, number][]
        ] = [[], []]
        for (let k = 0; k < distanceMap.length; k++) {
          const beaconKOfScannerIDistanceList = distanceMap[k]
          for (let l = 0; l < comparisonDistanceMap.length; l++) {
            const beaconLOfScannerJDistanceList = comparisonDistanceMap[l]
            const matchingDistances = beaconKOfScannerIDistanceList.filter(d =>
              beaconLOfScannerJDistanceList.includes(d))
            if (matchingDistances.length >= 11) {
              const mainKey = `${i},${k}`
              const correspondingKey = `${j},${l}`
              beaconCorrespondenceMap.set(mainKey, [...(
                beaconCorrespondenceMap.get(mainKey) || []
              ), correspondingKey])

              correspondingItemsArrays[0].push([...scannerSetI[k]])
              correspondingItemsArrays[1].push([...scannerSetJ[l]])
            }
          }
        }
        if (correspondingItemsArrays[0].length === 12) {
          whatScannerOverlapsWithWhatOtherScanner[i].push(j)
          scannerOverlapMap.set(`${i},${j}`, correspondingItemsArrays)
        }
      }
    }
  }
  while (whichScannersAreDefinitivelyMapped.length < scannerSetsOfBeacons.length) {
    for (let i = scannerSetsOfBeacons.length - 1; i >= 0; i--) {
      if (!whichScannersAreDefinitivelyMapped.includes(i)) {
        // i is the index of the scanner that we want to orient and map
        const mappedCorrespondingScannerIndex = whatScannerOverlapsWithWhatOtherScanner[i].find(
          x => whichScannersAreDefinitivelyMapped.includes(x)
        )
        if (mappedCorrespondingScannerIndex !== undefined) {
          // mappedCorrespondingScannerIndex is the index of the scanner to orient and map against
          const scannerOverlaps = scannerOverlapMap.get(`${i},${mappedCorrespondingScannerIndex}`)
          if (scannerOverlaps === undefined) throw new Error('fuck')
          const correspondingScannerPosAndOri = scannerPositionsAndOrientations[mappedCorrespondingScannerIndex]
          if (correspondingScannerPosAndOri === undefined) throw new Error('fuck')
          for (let o = 0; o < 48; o++) {
            const orientedOverlappingBeacons = scannerOverlaps[0].map(coords => orientPoint(coords, o))
            const orientedCorrespondingOverlaps = scannerOverlaps[1].map(coords => orientPoint(coords, correspondingScannerPosAndOri[3]))
            const translation = [
              orientedCorrespondingOverlaps[0][0] - orientedOverlappingBeacons[0][0],
              orientedCorrespondingOverlaps[0][1] - orientedOverlappingBeacons[0][1],
              orientedCorrespondingOverlaps[0][2] - orientedOverlappingBeacons[0][2],
            ] as [number, number, number]
            if (orientedOverlappingBeacons.every((orientedBeacon, obi) => (
              orientedBeacon[0] + translation[0] === orientedCorrespondingOverlaps[obi][0] &&
              orientedBeacon[1] + translation[1] === orientedCorrespondingOverlaps[obi][1] &&
              orientedBeacon[2] + translation[2] === orientedCorrespondingOverlaps[obi][2]
            ))) {
              scannerPositionsAndOrientations[i] = [
                translation[0] + correspondingScannerPosAndOri[0],
                translation[1] + correspondingScannerPosAndOri[1],
                translation[2] + correspondingScannerPosAndOri[2],
                o
              ]
              const definitivelyPlacedBeacons = scannerSetsOfBeacons[i].map(coords => {
                const orientedPoint = orientPoint(coords, o)
                return [
                  orientedPoint[0] + translation[0] + correspondingScannerPosAndOri[0],
                  orientedPoint[1] + translation[1] + correspondingScannerPosAndOri[1],
                  orientedPoint[2] + translation[2] + correspondingScannerPosAndOri[2]
                ] as [number, number, number]
              })
              definitivelyPlacedBeacons.forEach(coords => {
                definitiveBeacons.add(JSON.stringify(coords))
              })
              definitivelyMappedScannerSetsOfBeacons[i] = definitivelyPlacedBeacons
              whichScannersAreDefinitivelyMapped.push(i)
              break
            }
          }
        }
      }
    }
  }
  return {
    allBeacons: definitiveBeacons,
    scanners: scannerPositionsAndOrientations as [number, number, number, number][]
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Count the Beacons',
    onClick: (inputKey: string) => {
      const scannerSetsOfBeacons = INPUT[inputKey]
        .split('\n\n')
        .map(s => (
          s
            .split('\n')
            .slice(1)
            .map(b => b.split(',').map(n => Number(n)) as [number, number, number])
        ))
      const { allBeacons } = findAllBeaconsAndScanners(scannerSetsOfBeacons)

      return {
        answer1: allBeacons.size.toString()
      }
    }
  },
  {
    label: 'Find the Largest Distance',
    onClick: (inputKey: string) => {
      const scannerSetsOfBeacons = INPUT[inputKey]
        .split('\n\n')
        .map(s => (
          s
            .split('\n')
            .slice(1)
            .map(b => b.split(',').map(n => Number(n)) as [number, number, number])
        ))
      const { scanners } = findAllBeaconsAndScanners(scannerSetsOfBeacons)
      const scannerPositions = scanners.map(s => s.slice(0, 3))
      let maxDistance = 0
      for (let i = 0; i < scannerPositions.length; i++) {
        for (let j = i + 1; j < scannerPositions.length; j++) {
          maxDistance = Math.max(maxDistance, manhattanDistance(scannerPositions[i], scannerPositions[j]))
        }
      }

      return {
        answer2: maxDistance.toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{answer}</code> beacons.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The largest distance between two scanners is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 19,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Beacon Scanner'
}

export default config
