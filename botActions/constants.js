module.exports.notStarterError = name =>
  `Hello ${name}, you have not initialized me yet. Use the command /start to do so.`;

module.exports.ERROR_MESSAGE = 'You are not registered, please register with your nearest neighbourhood police center.';

module.exports.CITIZEN_HELP_MESSAGE = "*Hello\! I am Jeevani, your friendly neighbourhood assistant to help you with your medical records\!* \n My supported commands are\:\n \/start - init conversation \n \/help - provides details about available functions \n \/medical - retrieves your most recently updated medical records \n \/labreport - retrieves the results of your latest lab report \n \/lastvisit - retrieves the details of your last visit to the doctor"

module.exports.MEDICAL_RECORD_MESSAGE = (name, a_ID, dob, gender, height, weight, bloodType) =>
  `*Here is your most recently updated medical record:*\n----------------------------\n\nName:  *${name}*\nAadhar ID:  *${a_ID}\n*Date of birth:  *${dob}*\nGender:  *${gender}*\nHeight:  *${height}m*\nWeight:  *${weight}kg*\nBlood Type:  *${bloodType}*`

module.exports.LAST_VISIT_MESSAGE = (clinic, dateOfVisit, medicinePrescribed, additionalNotes) =>
  `*Here are the details of your last visit to the doctor:*\n----------------------------\n\nClinic Visited:  *${clinic}*\nDate visited:  *${dateOfVisit}*\nMedicine Prescribed:  *${medicinePrescribed}*\nAdditional Notes:  *${additionalNotes}*`
