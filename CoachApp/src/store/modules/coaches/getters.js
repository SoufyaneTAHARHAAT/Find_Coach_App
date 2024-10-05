export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
        const coaches = getters.coaches;
        const userId = rootGetters.userId;
        const res = coaches.some(coach => {
            coach.id===userId
        });
        console.log(res+" user");
        return coaches.some(coach => {
            coach.id===userId
        });
    }
};