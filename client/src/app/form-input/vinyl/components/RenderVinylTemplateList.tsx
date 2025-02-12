import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { CSSProperties } from 'react'

interface Template {
  templateId: string
  label: string
  img: {
    url: string
    width: number
    height: number
  }
  css?: CSSProperties
}

const templateList: Template[] = [
  {
    templateId: '1',
    label: 'Sour',
    img: {
      url: '/images/vinyl/form/sour.png',
      width: 64,
      height: 64,
    },
    css: {
      backgroundColor: '#968ECE',
    },
  },
  {
    templateId: '2',
    label: 'Sunlight',
    img: {
      url: '/images/vinyl/form/sunlight.png',
      width: 64,
      height: 64,
    },
  },
  {
    templateId: '3',
    label: 'Moonlight',
    img: {
      url: '/images/vinyl/form/moon.png',
      width: 41,
      height: 48,
    },
    css: {
      backgroundColor: '#09122C',
      color: '#fff'
    }
  },
  {
    templateId: '4',
    label: 'Angel',
    img: {
      url: '/images/vinyl/form/angel.png',
      width: 41,
      height: 60,
    },
    css: {
      backgroundColor: '#F1EAD6',
      backgroundImage: '/images/vinyl/form/background_angel.png',
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'cover'
    }
  },
]

const VinylTemplateItem = ({ templateId, label, img, css }: Template) => {
  const router = useRouter()

  const onClickHandler = () => {
    router.replace(`/vinyl/preview/${templateId}`)
  }

  return (
    <div
      onClick={onClickHandler}
      style={css}
      className="flex h-[64px] w-full items-center justify-between rounded-[20px] border border-gray-500"
    >
      <div className="self-end pb-1 pl-2">{label}</div>
      <Image src={img.url} alt="template-icon" width={img.width} height={img.height} />
    </div>
  )
}

const RenderVinylTemplateList = () => {
  return (
    <div className="flex flex-col gap-2">
      {templateList.map(({ templateId, label, img, css }) => {
        return (
          <VinylTemplateItem
            key={templateId}
            templateId={templateId}
            label={label}
            img={img}
            css={css}
          />
        )
      })}
    </div>
  )
}

export default RenderVinylTemplateList
