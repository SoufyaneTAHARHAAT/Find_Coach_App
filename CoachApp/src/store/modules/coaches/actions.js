import axios from "axios";

export default {
    async registerCoach(context, payload) {
        const userId = context.rootGetters.userId;
        const formattedCoach = {
            firstName: payload.first,
            lastName: payload.last,
            areas: payload.areas,
            description: payload.desc,
            hourlyRate: payload.rate,
        };
        try {
            await axios.put(`https://find-coach-app-38f67-default-rtdb.firebaseio.com/coaches/${userId}.json`, {formattedCoach});
        }
        catch(error) {
            console.error("Error sending data to database", error);
        }

        context.commit("registerCoach", {
            id: userId,
            ...formattedCoach,
        });        
    },

    async loadCoaches(context) {
        try {
            const response = await axios.get('https://find-coach-app-38f67-default-rtdb.firebaseio.com/coaches.json');
            const coachesLoaded = [];
            for (const id in response.data) {
                const loadedCoach = {
                    id: id,
                    firstName: response.data[id].formattedCoach.firstName || '',
                    lastName: response.data[id].formattedCoach.lastName || '',
                    areas: response.data[id].formattedCoach.areas || [],
                    description: response.data[id].formattedCoach.description || '',
                    hourlyRate: response.data[id].formattedCoach.hourlyRate || 0,
                }
                coachesLoaded.push(loadedCoach);
            }
            context.commit('setCoaches', coachesLoaded);
        }
        catch(error) {
            console.error("Error fetching data", error);
        }        
    }    
};