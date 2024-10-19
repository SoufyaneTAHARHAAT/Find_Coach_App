import axios from "axios";

export default {
    async registerCoach(context, payload) {
        const data = {
            id: context.rootGetters.userId,
            firstName: payload.first,
            lastName: payload.last,
            areas: payload.areas,
            description: payload.desc,
            hourlyRate: payload.rate,
        };
        context.commit("registerCoach", data);
        
        try {
            await axios.post('http://localhost:3000/coaches', data);
        }
        catch(error) {
            console.error("Failed to send data", error);
        }
    },
    
};