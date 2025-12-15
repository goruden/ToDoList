export const Shagai = ({ value }: { value: number }) => {
    const getShagai = (value: number) => {
        switch (value) {
            case 1: return 'Mori'
            case 2: return 'Temee'
            case 3: return 'Honi'
            case 4: return 'Ymaa'
            default: return 'Error?'
        }
    }
    return (
        <div>
            <p>{getShagai(value)}</p>
        </div>
    )
}
