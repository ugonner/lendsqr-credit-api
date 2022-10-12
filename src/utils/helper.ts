export class Helper{
    constructor(){}
    static getAmountOnLoan(loanType: string, rate: number, amount: number, duration: number): number{
        let totalAmount;
        if (/simple/i.test(loanType)) {
          totalAmount = ((amount * rate * duration) / 100) + Number(amount);
        } else {
          totalAmount =
            (Number(amount) * (1 + Number(rate) / 100 / Number(duration)) ^ (Number(duration) * Number(duration)))
        }
        return totalAmount;
    }

    static getDueDate(duration: number, durationTerm: string = "daily"): Date {
        const daySectonds = 24 * 60 * 60 * 1000;
        let timeSeconds;
        switch(durationTerm){
            case "daily":
                timeSeconds = duration * daySectonds;
                break;
            case "weekly":
                timeSeconds = 7 * duration * daySectonds
                break;
            case "monthly":
                timeSeconds = 30 * duration * daySectonds
                break;
            case "yearly":
                timeSeconds = 365 * duration * daySectonds;
            default:
                timeSeconds = duration * daySectonds
            break;
        }
        const time = Number(timeSeconds) + Number(new Date().getTime());
        return new Date(time);
    }

}