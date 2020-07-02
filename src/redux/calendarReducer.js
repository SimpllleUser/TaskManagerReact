// import
import moment from "moment";


const stateInitial = {
    month: () => {
        const MonthYear = today().format("MM-YYYY");
        let month = [];
        let max_day = today(
            `${selectMonth}-${selectMonth}`,
            "YYYY-MM"
        ).daysInMonth();
        for (let i = 0; i < max_day; i++) {
            let num = i + 1;
            let name = today(`${num}-${MonthYear}`, "DD-MM-YYYY").format("dddd");
            let data_day = { num, name };
            month.push(data_day);
        }
        return month;
    }
}

export const calendarReducer = (state = stateInitial, action) => {
    switch (action.type) {
        default: return state
    }
}