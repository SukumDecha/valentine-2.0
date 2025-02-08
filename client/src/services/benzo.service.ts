import { IBenzoSelector, IBenzoTimeSpent } from "@/types/benzo/time-spent"

const BenzoService = {

    async getTimeSpentData(uuid: string): Promise<IBenzoTimeSpent> {
        return {
            startDate: new Date(),
            imageUrl: "https://www.yourtango.com/sites/default/files/image_blog/small-things-do-as-couple-bring-you-closer-than-ever.png",
            descriptions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
        }
    },

    async getSelectorData(uuid: string): Promise<IBenzoSelector> {
        return {
            imageUrl: "https://www.yourtango.com/sites/default/files/image_blog/small-things-do-as-couple-bring-you-closer-than-ever.png",
        }
    }
}

export default BenzoService