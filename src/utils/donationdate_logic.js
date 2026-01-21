
export const calculateEligibility = (lastDonationDate) => {

    if(!lastDonationDate){
        return {daysLeft:0, isEligible:true};
    }
    const today = new Date();
    const lastDate= new Date(lastDonationDate)

    const targetDate= new Date(lastDate);
    targetDate.setDate(lastDate.getDate()+90);

    const differenceInMs= targetDate-today;
    const daysLeft=Math.ceil(differenceInMs/(1000*60*60*24));

    return {
        daysLeft: daysLeft>0? daysLeft:0,
        isEligible: daysLeft <= 0
    }
}

    