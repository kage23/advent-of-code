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
      //   x  y  z
      return [x, y, z]
    case 1:
      //   x  z  y
      return [x, z, y]
    case 2:
      //   y  x  z
      return [y, x, z]
    case 3:
      //   y  z  x
      return [y, z, x]
    case 4:
      //   z  x  y
      return [z, x, y]
    case 5:
      //   z  y  x
      return [z, y, x]
    case 6:
      //   x  y -z
      return [x, y, z * -1]
    case 7:
      //   x  z -y
      return [x, z, y * -1]
    case 8:
      //   y  x -z
      return [y, x, z * -1]
    case 9:
      //   y  z -x
      return [y, z, x * -1]
    case 10:
      //   z  x -y
      return [z, x, y * -1]
    case 11:
      //   z  y -x
      return [z, y, x * -1]
    case 12:
      //   x -y  z
      return [x, y * -1, z]
    case 13:
      //   x -z  y
      return [x, z * -1, y]
    case 14:
      //   y -x  z
      return [y, x * -1, z]
    case 15:
      //   y -z  x
      return [y, z * -1, x]
    case 16:
      //   z -x  y
      return [z, x * -1, y]
    case 17:
      //   z -y  x
      return [z, y * -1, x]
    case 18:
      //   x -y -z
      return [x, y * -1, z * -1]
    case 19:
      //   x -z -y
      return [x, z * -1, y * -1]
    case 20:
      //   y -x -z
      return [y, x * -1, z * -1]
    case 21:
      //   y -z -x
      return [y, z * -1, x * -1]
    case 22:
      //   z -x -y
      return [z, x * -1, y * -1]
    case 23:
      //   z -y -x
      return [z, y * -1, x * -1]
    case 24:
      //  -x  y  z
      return [x * -1, y, z]
    case 25:
      //  -x  z  y
      return [x * -1, z, y]
    case 26:
      //  -y  x  z
      return [y * -1, x, z]
    case 27:
      //  -y  z  x
      return [y * -1, z, x]
    case 28:
      //  -z  x  y
      return [z * -1, x, y]
    case 29:
      //  -z  y  x
      return [z * -1, y, x]
    case 30:
      //  -x  y -z
      return [x * -1, y, z * -1]
    case 31:
      //  -x  z -y
      return [x * -1, z, y * -1]
    case 32:
      //  -y  x -z
      return [y * -1, x, z * -1]
    case 33:
      //  -y  z -x
      return [y * -1, z, x * -1]
    case 34:
      //  -z  x -y
      return [z * -1, x, y * -1]
    case 35:
      //  -z  y -x
      return [z * -1, y, x * -1]
    case 36:
      //  -x -y  z
      return [x * -1, y * -1, z]
    case 37:
      //  -x -z  y
      return [x * -1, z * -1, y]
    case 38:
      //  -y -x  z
      return [y * -1, x * -1, z]
    case 39:
      //  -y -z  x
      return [y * -1, z * -1, x]
    case 40:
      //  -z -x  y
      return [z * -1, x * -1, y]
    case 41:
      //  -z -y  x
      return [z * -1, y * -1, x]
    case 42:
      //  -x -y -z
      return [x * -1, y * -1, z * -1]
    case 43:
      //  -x -z -y
      return [x * -1, z * -1, y * -1]
    case 44:
      //  -y -x -z
      return [y * -1, x * -1, z * -1]
    case 45:
      //  -y -z -x
      return [y * -1, z * -1, x * -1]
    case 46:
      //  -z -x -y
      return [z * -1, x * -1, y * -1]
    case 47:
      //  -z -y -x
      return [z * -1, y * -1, x * -1]
    default:
      throw new Error('nope')
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
      const whatScannerOverlapsWithWhatOtherScanner: number[][] = scannerSetsOfBeacons.map(() => ([]))
      for (let i = 0; i < distanceMapsPerScanner.length; i++) {
        // For each beacon in Scanner I, the distance from that beacon to every other beacon
        const distanceMap = distanceMapsPerScanner[i]
        for (let j = 0; j < distanceMapsPerScanner.length; j++) {
          if (j !== i) {
            // For each beacon in Scanner J, the distance from that beacon to every other beacon
            const comparisonMap = distanceMapsPerScanner[j]
            // Scanner I and Scanner J overlap if they share 12 beacons
            // That means they overlap if there are 12 items in distanceMap for which
            // there are corresponding items in comparisonMap. If an item in distanceMap
            // shares exactly 11 distances with an item in comparisonMap, those items correspond.
            let correspondingItemsCount = 0
            for (let k = 0; k < distanceMap.length; k++) {
              const beaconKOfScannerIDistanceList = distanceMap[k]
              for (let l = 0; l < comparisonMap.length; l++) {
                const beaconLOfScannerJDistanceList = comparisonMap[l]
                const matchingDistances = beaconKOfScannerIDistanceList.filter(d =>
                  beaconLOfScannerJDistanceList.includes(d))
                if (matchingDistances.length >= 11) {
                  const mainKey = `${i},${k}`
                  const correspondingKey = `${j},${l}`
                  beaconCorrespondenceMap.set(mainKey, [...(
                    beaconCorrespondenceMap.get(mainKey) || []
                  ), correspondingKey])

                  correspondingItemsCount++
                }
              }
            }
            if (correspondingItemsCount === 12) {
              whatScannerOverlapsWithWhatOtherScanner[i].push(j)
            }
          }
        }
      }
      debugger
      while (whichScannersAreDefinitivelyMapped.length < scannerSetsOfBeacons.length) {
        for (let i = 0; i < scannerSetsOfBeacons.length; i++) {
          if (!whichScannersAreDefinitivelyMapped.includes(i)) {
            // i is the index of the scanner that we want to orient and map
            debugger
            // Find a corresponding pair. For example, 1,0 corresponds to 0,9 in the demo.
            // For each possible orientation, assume that orientation is correct and figure out the translation.
            // Then try that translation against each other corresponding pair and see if it works.
            // If so, that's the correct orientation. If not, try the next orientation.






            // const mappedCorrespondingScannerIndex = whatScannerOverlapsWithWhatOtherScanner[i].find(
            //   x => whichScannersAreDefinitivelyMapped.includes(x)
            // )
            // if (mappedCorrespondingScannerIndex !== undefined) {
            //   // mappedCorrespondingScannerIndex is the index of the scanner that
            //   // we have already oriented and mapped that we're matching against
            //   const definitevelyMappedCorrespondingSet = definitivelyMappedScannerSetsOfBeacons[
            //     mappedCorrespondingScannerIndex
            //   ]
            //   debugger
            //   // Figure out the orientation
            //   // For each possible orientation (0-47)
            //   for (let o = 0; 0 < 48; o++) {
            //     // remap the scanner set
            //     const orientedSet = scannerSetsOfBeacons[i].map(coords => orientPoint(coords, o))
            //     console.log(definitevelyMappedCorrespondingSet)
            //     // then see if it maps to the definitively mapped corresponding set
            //     const doesItMap = orientedSet.every(([x, y, z], idx, oriSet) => {
            //       const correspondenceList = beaconCorrespondenceMap.get(`${i},${idx}`)
            //       if (correspondenceList === undefined) {
            //         // This is a beacon that doesn't correspond
            //         return true
            //       }
            //       const matchedPoint = correspondenceList.find(x =>
            //         whichScannersAreDefinitivelyMapped.includes(Number(x.split(',')[0]))
            //       )
            //       if (matchedPoint === undefined) throw new Error('fuck')
            //       const [matchedScannerIndex, matchedBeaconIndex] = matchedPoint.split(',').map(n => Number(n))
            //       const matchedScanner = definitivelyMappedScannerSetsOfBeacons[matchedScannerIndex]
            //       if (matchedScanner === undefined) throw new Error('fuck')
            //       const matchedBeaconPosition = matchedScanner[matchedBeaconIndex]
            //       const diff = [matchedBeaconPosition[0] - x, matchedBeaconPosition[1] - y, matchedBeaconPosition[2] - z]
            //       return oriSet.every(([xo, yo, zo], io) => { })
            //       debugger
            //       console.log(definitiveBeacons)
            //     })
            //     // Once the orientation is figured out, orient and map the scanner set
            //   }
            // }
          }
        }
      }

      return {
        answer1: definitiveBeacons.size.toString()
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
      The largest magnitude of any two numbers is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 19,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Beacon Scanner'
}

export default config
