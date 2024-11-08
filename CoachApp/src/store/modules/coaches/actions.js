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
            await axios.put(`https://find-coach-app-38f67-default-rtdb.firebaseio.com/coaches/${userId}.json`, {data});
        }
        catch(error) {
            console.error("Error sending data to database", error);
        }

        context.commit("registerCoach", {
            id: userId,
            ...data,
        });        
    },

    async loadCoaches(context) {
        try {
            const response = await axios.get('https://find-coach-app-38f67-default-rtdb.firebaseio.com/coaches.json');
            const coachesLoaded = [];
            for (const id in response.data) {
                //console.log(response.data[id].firstName);
                const loadedCoach = {
                    id: id,
                    firstName: response.data[id].firstName || '',
                    lastName: response.data[id].lastName || '',
                    areas: response.data[id].areas || [],
                    description: response.data[id].description || '',
                    hourlyRate: response.data[id].hourlyRate || 0,
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