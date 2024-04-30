'use client'
import Replicate from 'replicate'

const replicate = new Replicate()

const ClientButtonComponent = () => {
  let receiveOutput: any

  const handleClick = async () => {
    const input = { prompt: 'Banking app icon' }
    const output = await replicate.run(
      `nandycc/sdxl-app-icons${process.env.REPLICATE_API_TOKEN}`,
      { input }
    )
    receiveOutput = output
  }

  return <button onClick={handleClick}>Generate Image</button>
}

export default ClientButtonComponent