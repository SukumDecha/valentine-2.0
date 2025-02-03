import { IComponentProps } from '../../types/component'

const BenzoLayout = ({ children }: IComponentProps) => {
    return (
        <div className='benzo-layout'>
            {children}
        </div>
    )
}

export default BenzoLayout