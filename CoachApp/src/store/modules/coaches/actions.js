import axios from "axios";

export default {
    async registerCoach(context, payload) {
        const userId = context.rootGetters.userId;
        const data = {
            firstName: payload.first,
            lastName: payload.last,
            areas: payload.areas,
            description: payload.desc,
            hourlyRate: payload.rate,
        };
        try {
            await axios.put(`https://find-coach-app-38f67-default-rtdb.firebaseio.com/coaches/${userId}.json`, {body: data});
        }
        catch(error) {
            console.error("Error sending data to database", error);
        }

        context.commit("registerCoach", {
            id: userId,
            ...data,
        });
        
        // try {
        //     await axios.post('http://localhost:3000/coaches', data);
        // }
        // catch(error) {
        //     console.error("Failed to send data", error);
        // }
    },
    
};