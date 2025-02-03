const BenzoTimeSpentService = {

    async getTimeSpent(uuid: string): Promise<Date> {
        return new Date()
    },

    async getImageUrl(uuid: string): Promise<string> {
        return "https://www.yourtango.com/sites/default/files/image_blog/small-things-do-as-couple-bring-you-closer-than-ever.png"
    },

    async getDescriptions(uuid: string): Promise<string> {
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    }
}

export default BenzoTimeSpentService