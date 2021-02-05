export type CanvasState {
    offset: Point
    buffer: Point
    scale: number
}
export const CanvasContext = React.createContext<CanvasState>({} as any)
export default function CanvasProvider(props: PropsWithChildren<unknown>) {
    // Insert here all of the hooks from the previous example!
    return (
        <CanvasContext.Provider
            value={{
                offset: adjustedOffset.current,
                scale,
                buffer
            }}
        >
            <div ref={ref} onMouseDown={startPan} style={{ position: 'relative' }}>
                {props.children}
            </div>
        </CanvasContext.Provider>
    )
}