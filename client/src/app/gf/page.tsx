import GirlfriendProposal from "./page.client"

const steps = [
    { image: "/placeholder.svg?height=300&width=400", text: "Hey there!" },
    { image: "/placeholder.svg?height=300&width=400", text: "I have something to ask you..." },
    { image: "/placeholder.svg?height=300&width=400", text: "We've known each other for a while now..." },
    { image: "/placeholder.svg?height=300&width=400", text: "And I think you're amazing..." },
]

export default function Home() {
    return <GirlfriendProposal steps={steps} />
}

