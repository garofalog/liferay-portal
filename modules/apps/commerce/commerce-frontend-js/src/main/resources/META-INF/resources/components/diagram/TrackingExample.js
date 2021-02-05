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

import React, { useEffect, usePan, useRef, useScale, useState } from 'react';

export const TrackingExample = () => {
  const [buffer, setBuffer] = useState(pointUtils.ORIGIN)
  const ref = useRef<HTMLDivElement | null>(null)
  const [offset, startPan] = usePan()
  const scale = useScale(ref)

  // Track the mouse position.

  const mousePosRef = useMousePos(ref)

  // Track the last known offset and scale.

  const lastOffset = useLast(offset)
  const lastScale = useLast(scale)

  // Calculate the delta between the current and last offset—how far the user has panned.

  const delta = pointUtils.diff(offset, lastOffset)

  // Since scale also affects offset, we track our own "real" offset that's
  // changed by both panning and zooming.

  const adjustedOffset = useRef(pointUtils.sum(offset, delta))
  if (lastScale === scale) {
    // No change in scale—just apply the delta between the last and new offset
    // to the adjusted offset.

    adjustedOffset.current = pointUtils.sum(
      adjustedOffset.current,
      pointUtils.scale(delta, scale)
    )
  } else {
    // The scale has changed—adjust the offset to compensate for the change in
    // relative position of the pointer to the canvas.

    const lastMouse = pointUtils.scale(mousePosRef.current, lastScale)
    const newMouse = pointUtils.scale(mousePosRef.current, scale)
    const mouseOffset = pointUtils.diff(lastMouse, newMouse)
    adjustedOffset.current = pointUtils.sum(adjustedOffset.current, mouseOffset)
  }
  useLayoutEffect(() => {
    const height = ref.current?.clientHeight ?? 0
    const width = ref.current?.clientWidth ?? 0
    setBuffer({
      x: (width - width / scale) / 2,
      y: (height - height / scale) / 2
    })
  }, [scale, setBuffer])

  return (
    <div onMouseDown={startPan} ref={ref} style={{position: 'relative'}}>
      <div
        style={{
          backgroundImage: 'url(/grid.svg)',
          transform: `scale(${scale})`,
          backgroundPosition: `${-adjustedOffset.current.x}px ${-adjustedOffset
            .current.y}px`,
          position: 'absolute',
          bottom: buffer.y,
          left: buffer.x,
          right: buffer.x,
          top: buffer.y
        }}
      ></div>
    </div>
  )
}