import NotFound from "@/app/not-found";
import { IUserResponse } from "@/types/vinyl/vinyl";
import { VinylTemplate } from "@/types/vinyl/vinyl.template";
import dynamic from "next/dynamic";

interface IProps {
    template: string;
    data: IUserResponse
}

const vinylTemplates = Object.values(VinylTemplate)

const Vinyl = ({ template, data }: IProps) => {

    if (!vinylTemplates.includes(template as any) || !data) {
        return <NotFound />
    }

    let VinylWrapper: any = null

    if (template === VinylTemplate.MidNight) {
        VinylWrapper = dynamic(() => import("@/components/VinylLayout/themes/midnight"), {
            ssr: false
        })
    } else if (template === VinylTemplate.Olivia) {
        VinylWrapper = dynamic(() => import("@/components/VinylLayout/themes/olivia"), {
            ssr: false
        })
    } else if (template === VinylTemplate.Roman) {
        VinylWrapper = dynamic(() => import("@/components/VinylLayout/themes/roman"), {
            ssr: false
        })
    } else if (template === VinylTemplate.Sunlight) {
        VinylWrapper = dynamic(() => import("@/components/VinylLayout/themes/sunlight"), {
            ssr: false
        })
    } else if (template === VinylTemplate.Love) {
        VinylWrapper = dynamic(() => import("@/components/VinylLayout/themes/love"), {
            ssr: false
        })
    } else if (template === VinylTemplate.Scroll) {
        VinylWrapper = dynamic(() => import("@/components/VinylLayout/themes/scroll"), {
            ssr: false
        })
    }

    return (
        <VinylWrapper data={data} />
    )

}

export default Vinyl