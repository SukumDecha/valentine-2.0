import Image from "next/image"

type Props = {
  width: number;
  height: number;
}

const SunlightSun = ({width, height}: Props) => {
  return (
    <Image draggable="false" src='/images/vinyl/sunlight/sun.png' alt="cloud" width={width} height={height}/>
  )
}

export default SunlightSun