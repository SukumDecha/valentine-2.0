import Image from "next/image"

type Props = {
  width: number;
  height: number;
}

const SunlightCloud = ({width, height}: Props) => {
  return (
    <Image draggable="false" src='/images/vinyl/sunlight/cloud.png' alt="cloud" width={width} height={height}/>
  )
}

export default SunlightCloud