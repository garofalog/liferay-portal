/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {
    MouseEvent as SyntheticMouseEvent,
    useCallback,
    useRef,
    useState
} from 'react'

const Point = { 
    x, 
    y
}
const ORIGIN = Object.freeze({ x: 0, y: 0 })

/**
 * Track the user's intended panning offset by listening to `mousemove` events
 * once the user has started panning.
 */
export default function usePan(): [Point, (e: SyntheticMouseEvent) => void] {
    const [panState, setPanState] = useState<Point>(ORIGIN)

    // Track the last observed mouse position on pan.

    const lastPointRef = useRef(ORIGIN)
    const pan = useCallback((e: MouseEvent) => {
        const lastPoint = lastPointRef.current
        const point = { x: e.pageX, y: e.pageY }
        lastPointRef.current = point

        // Find the delta between the last mouse position on `mousemove` and the
        // current mouse position.
        //
        // Then, apply that delta to the current pan offset and set that as the new
        // state.

        setPanState(panState => {
            const delta = {
                x: lastPoint.x - point.x,
                y: lastPoint.y - point.y
            }
            const offset = {
                x: panState.x + delta.x,
                y: panState.y + delta.y
            }

            return offset
        })
    }, [])

    // Tear down listeners.

    const endPan = useCallback(() => {
        document.removeEventListener('mousemove', pan)
        document.removeEventListener('mouseup', endPan)
    }, [pan])

    // Set up listeners.

    const startPan = useCallback(
        (e: SyntheticMouseEvent) => {
            document.addEventListener('mousemove', pan)
            document.addEventListener('mouseup', endPan)
            lastPointRef.current = { x: e.pageX, y: e.pageY }
        },
        [pan, endPan]
    )

    return [panState, startPan]
}