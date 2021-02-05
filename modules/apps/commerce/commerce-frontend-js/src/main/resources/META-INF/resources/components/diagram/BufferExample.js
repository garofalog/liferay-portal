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

import React, {useEffect, usePan, useRef, useScale, useState} from 'react';

export const BufferExample = () => {
    const [buffer, setBuffer] = useState(pointUtils.ORIGIN)
    const [offset, startPan] = usePan()
    const ref = useRef<HTMLDivElement | null>(null)
    const scale = useScale(ref)
    useLayoutEffect(() => {
        const height = ref.current?.clientHeight ?? 0
        const width = ref.current?.clientWidth ?? 0

        // This is the application of the above formula!

        setBuffer({
            x: (width - width / scale) / 2,
            y: (height - height / scale) / 2
        })
    }, [scale, setBuffer])

    return (
        <div onMouseDown={startPan} ref={ref} style={{ position: 'relative' }}>
            <div
                style={{
                    backgroundImage: 'url(/grid.svg)',
                    transform: `scale(${scale})`,
                    backgroundPosition: `${-offset.x}px ${-offset.y}px`,
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