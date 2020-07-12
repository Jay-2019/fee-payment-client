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

// calculating the semester fee-type.
export function calculateSemesterFeeType(feeType) {
    const {
        _id,
        year,
        totalFee,
        delayFee,
        studyTripFee,
        tuitionFee,
        laboratory,
        securityFee,
        hostelFee,
        otherCharges,
        entranceFees,
        centralLibraryFee,
        studentSmartCardFee,
        sportsAndCulturalProgramFee,
        studentWelfareFee,
        developmentFee,
        studentAcademicGuide,
        examinationFee,
        energyCharges,
        internetFee,
        updatedAt,
        createdAt,
    } = feeType;
    
    return {
        _id: _id,
        year: year,
        totalFee: totalFee / 2,
        delayFee: delayFee / 2,
        studyTripFee: studyTripFee / 2,
        tuitionFee: tuitionFee / 2,
        laboratory: laboratory / 2,
        securityFee: securityFee / 2,
        hostelFee: hostelFee / 2,
        otherCharges: otherCharges / 2,
        entranceFees: entranceFees / 2,
        centralLibraryFee: centralLibraryFee / 2,
        studentSmartCardFee: studentSmartCardFee / 2,
        sportsAndCulturalProgramFee: sportsAndCulturalProgramFee / 2,
        studentWelfareFee: studentWelfareFee / 2,
        developmentFee: developmentFee / 2,
        studentAcademicGuide: studentAcademicGuide / 2,
        examinationFee: examinationFee / 2,
        energyCharges: energyCharges / 2,
        internetFee: internetFee / 2,
        updatedAt: updatedAt,
        createdAt: createdAt,

    }
};