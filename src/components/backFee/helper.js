// calculating the back-fee-type according to examMode and Number of selected Subjects :)

const calculateFeeBasedOnExamMode = (examMode, selectSubject, backFeeType) => {

    const { _id, totalFee, examinationFormFee, backPaper, delayFee, otherCharges, updatedAt,createdAt } = backFeeType;

    // Calculation fee type For Both examMode(Internal+External) and No. of selected subjects
    if (examMode.length === 2) {

        return {
            _id:_id,
            backPaper: (backPaper * 2 * selectSubject.length),
            examinationFormFee: examinationFormFee,
            delayFee: delayFee,
            otherCharges: otherCharges,
            totalFee: (backPaper * 2 * selectSubject.length) + examinationFormFee + otherCharges,
            updatedAt:updatedAt,
            createdAt:createdAt

        };
    };

    // Calculation fee type For Only a examMode (Internal OR External) and No. of selected subjects
    if (examMode.length === 1) {
        return {

            backPaper: (backPaper * selectSubject.length),
            examinationFormFee: examinationFormFee,
            delayFee: delayFee,
            otherCharges: otherCharges,
            totalFee: (backPaper * selectSubject.length) + examinationFormFee + otherCharges,
            updatedAt:updatedAt,
            createdAt:createdAt

        };
    };

    return {};

};
export { calculateFeeBasedOnExamMode };