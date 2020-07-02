//map selected year of feeType with Id
export function mapSelectedYearWithId(year) {
    let idOfSelectedYear;
    switch (year) {
        case "First Year":
            idOfSelectedYear = "5ec13f8678ea5a2e0c1a6bfe";
            break;
        case "Second Year":
            idOfSelectedYear = "5ec13ffc78ea5a2e0c1a6bff";
            break;
        case "Third Year":
            idOfSelectedYear = "5ec1401078ea5a2e0c1a6c00";
            break;
        case "Fourth Year":
            idOfSelectedYear = "5ec1402178ea5a2e0c1a6c01";
            break;
        default:
            return null;
    }
    return idOfSelectedYear;
};

export function calculateSemesterFeeType(feeType) {
    return {
        _id: feeType._id,
        year: feeType.year,
        totalFee: feeType.totalFee / 2,
        delayFee: feeType.delayFee / 2,
        studyTripFee: feeType.studyTripFee / 2,
        tuitionFee: feeType.tuitionFee / 2,
        laboratory: feeType.laboratory / 2,
        securityFee: feeType.securityFee / 2,
        hostelFee: feeType.hostelFee / 2,
        otherCharges: feeType.otherCharges / 2,
        entranceFees: feeType.entranceFees / 2,
        centralLibraryFee: feeType.centralLibraryFee / 2,
        studentSmartCardFee: feeType.studentSmartCardFee / 2,
        sportsAndCulturalProgramFee: feeType.sportsAndCulturalProgramFee / 2,
        studentWelfareFee: feeType.studentWelfareFee / 2,
        developmentFee: feeType.developmentFee / 2,
        studentAcademicGuide: feeType.studentAcademicGuide / 2,
        examinationFee: feeType.examinationFee / 2,
        energyCharges: feeType.energyCharges / 2,
        internetFee: feeType.internetFee / 2,
        updatedAt: feeType.updatedAt,
        createdAt: feeType.createdAt,

    }
};



