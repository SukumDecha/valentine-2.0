'use client'
import { IComponentProps } from "@/types/component"
import { Toaster } from "react-hot-toast"

const ClientProvider = ({ children }: IComponentProps) => {
    return (
        <>
            <Toaster />
            {children}
        </>
    )
}

export default ClientProvider