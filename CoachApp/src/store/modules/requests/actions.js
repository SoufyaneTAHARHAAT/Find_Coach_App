import axios from "axios";

export default {
    async contactCoach(context, payload) {
        const newRequest = {
            //coachId: payload.coachId,
            email: payload.email,
            message: payload.message,
        };
        

        try {
            const response = await axios.post(`https://find-coach-app-38f67-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, newRequest);
            
            newRequest.id = response.name;
            newRequest.coachId = payload.coachId
            context.commit("addRequest", newRequest);
        }
        catch(error) {
            console.error("Error sending data", error.message);
            //throw error;
        }
    },

    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const requests = [];
        
        try {
            const response = await axios.get(`https://find-coach-app-38f67-default-rtdb.firebaseio.com/requests/${coachId}.json`);
            
            for(const id in response.data) {
                const loadedRequest = {
                    id: id,
                    coachId: coachId,
                    email: response.data[id].email,
                    message: response.data[id].message
                }
                requests.push(loadedRequest);
            }
            context.commit('setRequests', requests);
        }
        catch(error) {
            console.error("Error fetching requests", error.message);
        }
    }
};