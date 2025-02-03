import BenzoLayout from "@/components/BenzoLayout/BenzoLayout"
import { IComponentProps } from "@/types/component"

const layout = ({ children }: IComponentProps) => {
    return (
        <BenzoLayout>
            {children}
        </BenzoLayout>
    )
}

export default layout