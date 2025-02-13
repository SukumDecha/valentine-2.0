import { VinylTemplate } from '@/types/vinyl/vinyl.template'
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
    templateId: VinylTemplate.Olivia,
    label: VinylTemplate.Olivia,
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
    templateId: VinylTemplate.Sunlight,
    label: VinylTemplate.Sunlight,
    img: {
      url: '/images/vinyl/form/sunlight.png',
      width: 64,
      height: 64,
    },
  },
  {
    templateId: VinylTemplate.MidNight,
    label: VinylTemplate.MidNight,
    img: {
      url: '/images/vinyl/midnight/blue-moon.png',
      width: 41,
      height: 48,
    },
    css: {
      backgroundColor: '#09122C',
      color: '#fff'
    }
  },
  {
    templateId: VinylTemplate.Roman,
    label: VinylTemplate.Roman,
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
  {
    templateId: VinylTemplate.Love,
    label: VinylTemplate.Love,
    img: {
      url: '/images/templateLove/libstic.png',
      width: 41*1.5,
      height: 60*1.5,
    },
    css: {
      backgroundColor: '#FFA6C1',
    }
  },
]

const VinylTemplateItem = ({ templateId, label, img, css }: Template) => {
  const router = useRouter()

  const onClickHandler = () => {
    router.replace(`/preview/${templateId}`)
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
