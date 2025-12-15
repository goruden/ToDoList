import { useState } from 'react'
import {Shagai} from './'

const RollShagai = () => {
    const [shagai1, setShagai1] = useState(1)
    const [shagai2, setShagai2] = useState(1)
    const [shagai3, setShagai3] = useState(1)
    const [shagai4, setShagai4] = useState(1)

    const [rolling, setRolling] = useState(false)

    const roll = () => {
        setRolling(true)
        setTimeout(() => {
            setShagai1(Math.floor(Math.random() * 4) + 1)
            setShagai2(Math.floor(Math.random() * 4) + 1)
            // setShagai2([25, 50, 75, 100][Math.floor(Math.random() * 4)])
            setShagai3(Math.floor(Math.random() * 4) + 1)
            setShagai4(Math.floor(Math.random() * 4) + 1)
            setRolling(false)
        }, 1000)
    }

    return (
        <div>
            <Shagai value={shagai1} />
            <Shagai value={shagai2} />
            <Shagai value={shagai3} />
            <Shagai value={shagai4} />
            <button onClick={roll} disabled={rolling}>
                Roll
            </button>
        </div>
    )
}

export default RollShagai