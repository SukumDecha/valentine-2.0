import { useEffect } from 'react'
import FloatingAnimation from '../../../Shared/animations/FloatingAnimation'
import SunlightCloud from './SunlightCloud'
import SunlightSun from './SunlightSun'


type Props = {
  children: React.ReactNode
}


const SunlightBackground = ({ children }: Props): React.ReactNode => {



  return (
    <div className="bg-gradient-to-b from-sky-300 to-sky-200 w-screen max-w-full h-screen overflow-x-hidden">
      <div className="z-0">
        <div className="absolute -left-10 -top-5">
          {/* <FloatingAnimation animationEndPos={5}> */}
          <SunlightSun width={152} height={144} />
          {/* </FloatingAnimation> */}
        </div>
        <div className="absolute right-0 overflow-x-hidden">
          <FloatingAnimation animationEndPos={10}>
            <SunlightCloud width={152} height={144} />
          </FloatingAnimation>
        </div>
        <div className="absolute -left-10 top-1/2">
          <FloatingAnimation animationEndPos={10}>
            <SunlightCloud width={152 * 1.5} height={144 * 1.5} />
          </FloatingAnimation>
        </div>
        <div className="absolute right-0 top-3/4 overflow-x-hidden">
          <FloatingAnimation animationEndPos={10}>
            <SunlightCloud width={152 * 1.3} height={144 * 1.3} />
          </FloatingAnimation>
        </div>
      </div>
      <div className="z-10">{children}</div>
    </div>
  )
}

export default SunlightBackground