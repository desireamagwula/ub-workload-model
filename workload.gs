// Define faculties object at the top of the file
const faculties = {
  'FMSS': 'Faculty of Management and Social Sciences',
  'FEA': 'Faculty of Engineering and Architecture',
  'FST': 'Faculty of Science and Technology',
  'FHS': 'Faculty of Health Sciences'
};

// Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCfuTLK4LwNil6h3UH4xTNxiCVAf2Jfxv8",
  authDomain: "workload-model-95c9d.firebaseapp.com",
  databaseURL: "https://workload-model-95c9d-default-rtdb.firebaseio.com",
  projectId: "workload-model-95c9d",
  storageBucket: "workload-model-95c9d.firebasestorage.app",
  messagingSenderId: "283257025947",
  appId: "1:283257025947:web:993216cf8c828b900a1d3e",
  measurementId: "G-3394C28SW5"
};

// Firebase database reference
const BASE_URL = FIREBASE_CONFIG.databaseURL;
const SECRET = FIREBASE_CONFIG.apiKey;


// const CREDENTIALS_FILE_ID = "1gppVx4q6t-uQHOMf7POBcsYUm2a-444q";
// const PROJECT_ID = "workload-model-95c9d";


// function getServiceAccountKey() {
//   var file = DriveApp.getFileById(CREDENTIALS_FILE_ID);
//   return JSON.parse(file.getBlob().getDataAsString());
// }

// function createRecord(path, data) {
//   const url = `${BASE_URL}/${path}.json?auth=${SECRET}`;
//   const options = {
//     method: 'post',
//     contentType: 'application/json',
//     payload: JSON.stringify(data),
//   };
//   const response = UrlFetchApp.fetch(url, options);
//   Logger.log(response.getContentText());
// }


// createRecord("test",{name: "Desire"});

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Faculty Workload System')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Submits workload entries to Firebase
 * @param {Array<Object>} entries - Array of workload entries
 * @returns {Object} Success status and message
 */
function submitAllWorkloads(entries) {
  try {
    if (!entries || entries.length === 0) {
      return { success: false, message: 'No entries provided' };
    }

    // Get the current user's email
    const userEmail = Session.getActiveUser().getEmail();
    if (!userEmail) {
      return { success: false, message: 'User email not found' };
    }
    // Sanitize email for Firebase path
    const safeEmail = userEmail.replace(/\./g, ',');

    // Get the first entry to determine semester and period
    const firstEntry = entries[0];
    if (!firstEntry.semester || !firstEntry.submissionType) {
      return { success: false, message: 'Missing semester or submission type' };
    }

    const semester = firstEntry.semester;
    // Convert submissionType to period (Beginning -> start, Ending -> end)
    const period = firstEntry.submissionType === 'Beginning' ? 'start' : 'end';

    // Use existing recordId if provided (for edits), otherwise create a new one
    const recordId = firstEntry.recordId ? firstEntry.recordId : `${safeEmail}_${semester}`;

    // Check if record exists
    const existingRecord = getWorkloadRecord(recordId);
    
    // Prepare the data to be stored
    const workloadData = {
      email: userEmail,
      semester: semester,
      lastUpdated: new Date().toISOString()
    };

    // Process entries and calculate total points including adjustments
    const processedEntries = entries.map(entry => {
      // Get base points
      const basePoints = entry.basePoints || 0;
      
      // Process adjustments
      let adjustmentPoints = 0;
      const adjustments = [];
      
      if (entry.adjustments && entry.adjustments.length > 0) {
        entry.adjustments.forEach(adj => {
          adjustmentPoints += adj.points || 0;
          adjustments.push({
            type: adj.type,
            points: adj.points,
            details: adj.details || {}
          });
        });
      }
      
      return {
        ...entry,
        basePoints: basePoints,
        adjustmentPoints: adjustmentPoints,
        totalPoints: basePoints + adjustmentPoints,
        adjustments: adjustments,
        submissionDate: new Date().toISOString()
      };
    });

    // Add the entries to either start or end section
    workloadData[period] = processedEntries;

    // If record exists, merge with existing data
    if (existingRecord) {
      if (period === 'start') {
        workloadData.end = existingRecord.end;
      } else {
        workloadData.start = existingRecord.start;
      }
    }

    // Store in Firebase
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`, {
      method: 'PUT',
      contentType: 'application/json',
      payload: JSON.stringify(workloadData)
    });

    return {
      success: true,
      message: `Workload entries submitted successfully for ${firstEntry.submissionType} of semester ${semester}.`
    };
  } catch (error) {
    console.error('Error in submitAllWorkloads:', error);
    return {
      success: false,
      message: 'Error submitting workload entries: ' + error.message
    };
  }
}

/**
 * Gets a specific workload record from Firebase
 * @param {string} recordId - The unique identifier for the record
 * @returns {Object|null} The workload record or null if not found
 */
function getWorkloadRecord(recordId) {
  try {
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`);
    const data = JSON.parse(response.getContentText());
    return data || null;
  } catch (error) {
    console.error('Error in getWorkloadRecord:', error);
    return null;
  }
}

/**
 * Saves a draft workload for the current user in Firebase.
 * @param {Object} draftData - Draft payload from the client.
 * @returns {Object} Result with success flag, id, and message.
 */
function saveDraft(draftData) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    if (!userEmail) {
      return { success: false, message: 'User email not found' };
    }
    if (!isUserAuthorized(userEmail)) {
      return { success: false, message: 'Unauthorized' };
    }

    const safeEmail = userEmail.replace(/\./g, ',');
    const timestamp = new Date().toISOString();
    const id = draftData && draftData.id ? String(draftData.id) : String(Date.now());

    const draftObject = {
      id: id,
      userEmail: userEmail,
      timestamp: timestamp,
      formData: draftData && draftData.formData ? draftData.formData : {},
      entries: Array.isArray(draftData && draftData.entries) ? draftData.entries : [],
      adjustments: Array.isArray(draftData && draftData.adjustments) ? draftData.adjustments : []
    };

    UrlFetchApp.fetch(`${BASE_URL}/drafts/${safeEmail}/${id}.json`, {
      method: 'PUT',
      contentType: 'application/json',
      payload: JSON.stringify(draftObject)
    });

    return { success: true, id: id, message: 'Draft saved successfully.' };
  } catch (error) {
    console.error('Error in saveDraft:', error);
    return { success: false, message: 'Error saving draft: ' + error.message };
  }
}

/**
 * Lists all drafts for the current user.
 * @returns {Array<Object>} Array of draft objects.
 */
function listDraftsForCurrentUser() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    if (!userEmail || !isUserAuthorized(userEmail)) {
      return [];
    }
    const safeEmail = userEmail.replace(/\./g, ',');
    const response = UrlFetchApp.fetch(`${BASE_URL}/drafts/${safeEmail}.json`);
    const data = JSON.parse(response.getContentText());
    if (!data) return [];

    const drafts = Object.values(data);
    drafts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return drafts;
  } catch (error) {
    console.error('Error in listDraftsForCurrentUser:', error);
    return [];
  }
}

/**
 * Gets a specific draft for the current user by id.
 * @param {string} draftId - Draft identifier.
 * @returns {Object|null} Draft object or null if not found/unauthorized.
 */
function getDraftById(draftId) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    if (!userEmail || !isUserAuthorized(userEmail)) {
      return null;
    }
    const safeEmail = userEmail.replace(/\./g, ',');
    const response = UrlFetchApp.fetch(`${BASE_URL}/drafts/${safeEmail}/${draftId}.json`);
    const data = JSON.parse(response.getContentText());
    return data || null;
  } catch (error) {
    console.error('Error in getDraftById:', error);
    return null;
  }
}

/**
 * Deletes a specific draft for the current user by id.
 * @param {string} draftId - Draft identifier.
 * @returns {Object} Result with success flag and message.
 */
function deleteDraftById(draftId) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    if (!userEmail || !isUserAuthorized(userEmail)) {
      return { success: false, message: 'Unauthorized' };
    }
    const safeEmail = userEmail.replace(/\./g, ',');
    UrlFetchApp.fetch(`${BASE_URL}/drafts/${safeEmail}/${draftId}.json`, {
      method: 'delete'
    });
    return { success: true, message: 'Draft deleted successfully.' };
  } catch (error) {
    console.error('Error in deleteDraftById:', error);
    return { success: false, message: 'Error deleting draft: ' + error.message };
  }
}

/**
 * Gets all workload records for a specific user
 * @param {string} email - The user's email
 * @returns {Array<Object>} Array of workload records
 */
function getUserWorkloadRecords(email) {
  try {
    if (!isUserAuthorized(email)) return [];
    const safeEmail = email.replace(/\./g, ',');
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
    const data = JSON.parse(response.getContentText());
    
    if (!data) return [];
    
    // Filter records for the specific user
    return Object.entries(data)
      .filter(([key]) => key.startsWith(safeEmail + '_'))
      .map(([key, value]) => ({
        id: key,
        ...value
      }))
      .sort((a, b) => b.semester.localeCompare(a.semester));
  } catch (error) {
    console.error('Error in getUserWorkloadRecords:', error);
    return [];
  }
}

/**
 * Updates summary data in Firebase
 * @param {string} submissionType - The submission type (e.g., 'Beginning', 'Ending')
 */
function updateSummaryInFirebase(submissionType) {
  try {
    // Get all workload entries
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
    const data = JSON.parse(response.getContentText());
    
    if (!data) return;
    
    const summaryData = new Map();
    
    // Process each faculty's data
    for (const [faculty, facultyData] of Object.entries(data)) {
      if (!facultyData[submissionType]) continue;
      
      for (const [entryId, entry] of Object.entries(facultyData[submissionType])) {
        const key = `${entry.personName}_${faculty}`;
        if (!summaryData.has(key)) {
          summaryData.set(key, {
            name: entry.personName,
            faculty: faculty,
            facultyCategory: entry.facultyCategory,
            facultyType: entry.facultyType,
            contactHours: entry.contactHours,
            teaching: 0,
            research: 0,
            service: 0,
            professional: 0,
            leadership: 0,
            baseTotal: 0,
            adjustments: 0,
            total: 0,
            adjustmentDetails: []
          });
        }
        
        const summary = summaryData.get(key);
        summary.baseTotal += entry.basePoints || 0;
        summary.adjustments += entry.adjustmentPoints || 0;
        // (after processing all entries for a user)
        if (facultyData[submissionType] && Array.isArray(facultyData[submissionType])) {
          const lastEntry = facultyData[submissionType][facultyData[submissionType].length - 1];
          if (lastEntry) summary.total = lastEntry.totalPoints || 0;
        }
        
        // Add adjustment details
        if (entry.adjustments && entry.adjustments.length > 0) {
          summary.adjustmentDetails.push(...entry.adjustments);
        }
        
        switch(entry.category) {
          case 'Teaching':
            // For category breakdowns, show only the last entry's points for each category:
            let lastTeaching = null;
            for (let i = facultyData[submissionType].length - 1; i >= 0; i--) {
              const entry = facultyData[submissionType][i];
              if (!lastTeaching && entry.category === 'Teaching') lastTeaching = entry.totalPoints || 0;
            }
            summary.teaching = lastTeaching || 0;
            break;
          case 'Research':
            // For category breakdowns, show only the last entry's points for each category:
            let lastResearch = null;
            for (let i = facultyData[submissionType].length - 1; i >= 0; i--) {
              const entry = facultyData[submissionType][i];
              if (!lastResearch && entry.category === 'Research') lastResearch = entry.totalPoints || 0;
            }
            summary.research = lastResearch || 0;
            break;
          case 'Service':
            // For category breakdowns, show only the last entry's points for each category:
            let lastService = null;
            for (let i = facultyData[submissionType].length - 1; i >= 0; i--) {
              const entry = facultyData[submissionType][i];
              if (!lastService && entry.category === 'Service') lastService = entry.totalPoints || 0;
            }
            summary.service = lastService || 0;
            break;
          case 'Professional Development':
            // For category breakdowns, show only the last entry's points for each category:
            let lastProfessional = null;
            for (let i = facultyData[submissionType].length - 1; i >= 0; i--) {
              const entry = facultyData[submissionType][i];
              if (!lastProfessional && entry.category === 'Professional Development') lastProfessional = entry.totalPoints || 0;
            }
            summary.professional = lastProfessional || 0;
            break;
          case 'Leadership':
            // For category breakdowns, show only the last entry's points for each category:
            let lastLeadership = null;
            for (let i = facultyData[submissionType].length - 1; i >= 0; i--) {
              const entry = facultyData[submissionType][i];
              if (!lastLeadership && entry.category === 'Leadership') lastLeadership = entry.totalPoints || 0;
            }
            summary.leadership = lastLeadership || 0;
            break;
        }
      }
    }
    
    // Update summary data in Firebase
    const summaryResponse = UrlFetchApp.fetch(`${BASE_URL}/summary/${submissionType}.json`, {
      method: 'PUT',
      contentType: 'application/json',
      payload: JSON.stringify(Object.fromEntries(summaryData))
    });
    
    return true;
  } catch (error) {
    console.error('Error updating summary:', error);
    return false;
  }
}

/**
 * Gets workload summary from Firebase
 * @param {string} submissionType - The submission type (e.g., 'Beginning', 'Ending')
 * @returns {Array<Object>} Array of summary data
 */
function getWorkloadSummary(submissionType) {
  try {
    const response = UrlFetchApp.fetch(`${BASE_URL}/summaries/${submissionType}.json`);
    const data = JSON.parse(response.getContentText());
    return data || [];
  } catch (error) {
    console.error('Error in getWorkloadSummary:', error);
    return [];
  }
}

/**
 * Gets all workload entries from Firebase
 * @returns {Array<Object>} Array of all workload entries
 */
function getWorkloadEntries() {
  try {
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
    const data = JSON.parse(response.getContentText());
    
    if (!data) return [];
    
    const allEntries = [];
    
    // Process each faculty and submission type
    for (const [faculty, facultyData] of Object.entries(data)) {
      for (const [submissionType, entries] of Object.entries(facultyData)) {
        for (const [entryId, entry] of Object.entries(entries)) {
          allEntries.push({
            ...entry,
            id: entryId,
            faculty: faculty,
            submissionType: submissionType
          });
        }
      }
    }
    
    // Sort by submission date (newest first)
    return allEntries.sort((a, b) => 
      new Date(b.submissionDate) - new Date(a.submissionDate)
    );
  } catch (error) {
    console.error('Error in getWorkloadEntries:', error);
    return [];
  }
}

/**
 * Approves a specific workload entry in Firebase
 * @param {string} entryId - ID of the entry to approve
 * @returns {boolean} True if entry was found and approved, false otherwise
 */


/**
 * Updates the approval status of a specific entry in Firebase
 * @param {string} faculty - Faculty code (e.g., 'FMSS', 'FEA')
 * @param {string} entryId - ID of the entry to update
 * @param {string} status - New status value
 * @returns {boolean} True if update was successful
 */


// Get workload status based on total points
function getWorkloadStatus(totalPoints) {
  if (totalPoints >= 100) return 'Exceeds Expectations';
  if (totalPoints >= 80) return 'Meets Expectations';
  return 'Below Expectations';
}


/**
 * Returns the current user's email
 */
function getCurrentUserEmail() {
  return Session.getActiveUser().getEmail();
}

/**
 * Checks if a record exists for a given email, semester, and period
 * @param {string} email
 * @param {string} semester
 * @param {string} period ('Beginning' or 'Ending')
 * @returns {boolean}
 */
function checkRecordExists(email, semester, period) {
  const safeEmail = email.replace(/\./g, ',');
  const recordId = `${safeEmail}_${semester}`;
  const record = getWorkloadRecord(recordId);
  if (!record) return false;
  if (period === 'Beginning' && record.start) return true;
  if (period === 'Ending' && record.end) return true;
  return false;
}

// Add profile management functions
function getUserProfile() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    if (!isUserAuthorized(userEmail)) return null;
    const safeEmail = userEmail.replace(/\./g, ',');
    const response = UrlFetchApp.fetch(`${BASE_URL}/profiles/${safeEmail}.json`);
    const profile = JSON.parse(response.getContentText());
    return profile;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

function saveUserProfile(profileData) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    if (!isUserAuthorized(userEmail)) return { success: false, message: 'Unauthorized' };
    const safeEmail = userEmail.replace(/\./g, ',');
    // Validate required fields
    if (!profileData.name || !profileData.faculty || !profileData.yearsWorking || 
        !profileData.facultyCategory || !profileData.facultyType) {
      return { success: false, message: 'All fields are required' };
    }
    // Save to Firebase
    const response = UrlFetchApp.fetch(`${BASE_URL}/profiles/${safeEmail}.json`, {
      method: 'PUT',
      contentType: 'application/json',
      payload: JSON.stringify(profileData)
    });
    return { success: true, message: 'Profile saved successfully' };
  } catch (error) {
    console.error('Error saving user profile:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Gets the role of a user based on their email
 * @param {string} email - The user's email
 * @returns {string} The user's role
 */
function getUserRole(email) {
    if (email === AUTHORIZED_USERS.superAdmin) return 'Super Admin';
    if (AUTHORIZED_USERS.deans[email]) return 'Dean';
    if (AUTHORIZED_USERS.chairs[email]) return 'Chair';
    if (AUTHORIZED_USERS.faculty.includes(email)) return 'Faculty';
    return null;
}

/**
 * Gets all users under a dean/chair
 * For deans: returns their chairs. For chairs: returns their faculty.
 * @param {string} email - The user's email
 * @returns {Array<string>} Array of user emails
 */
function getFacultyUnderUser(email) {
    if (AUTHORIZED_USERS.deans[email]) {
        // Return list of chair emails under this dean
        return AUTHORIZED_USERS.deans[email].faculty;
    }
    if (AUTHORIZED_USERS.chairs[email]) {
        // Return list of faculty emails under this chair
        return AUTHORIZED_USERS.chairs[email].faculty;
    }
    return [];
}

/**
 * Gets workload data for a specific faculty member
 * @param {string} email - The faculty member's email
 * @returns {Object} The faculty member's workload data
 */
function getFacultyWorkloadData(email) {
    const safeEmail = email.replace(/\./g, ',');
    Logger.log('Looking up workload for: ' + safeEmail);
    try {
        if (!isUserAuthorized(email)) return null;
        // Fetch all workloads
        const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
        const data = JSON.parse(response.getContentText());
        if (!data) {
            Logger.log('No data found for: ' + safeEmail);
            return { status: 'No Submission', totalPoints: 0 };
        }
        // Filter all records for this faculty
        const facultyRecords = Object.entries(data)
            .filter(([key]) => key.startsWith(safeEmail + '_'))
            .map(([key, value]) => {
                // Extract semester from key
                const semester = key.split('_').slice(-1)[0];
                return { semester, ...value };
            });
        if (facultyRecords.length === 0) {
            Logger.log('No records found for: ' + safeEmail);
            return { status: 'No Submission', totalPoints: 0 };
        }
        Logger.log('Faculty records found: ' + JSON.stringify(facultyRecords));
        // Return all records, each with its semester
        return facultyRecords;
    } catch (error) {
        console.error('Error getting faculty workload data:', error);
        return null;
    }
}

/**
 * Updates a faculty member's comment
 * @param {string} email - The faculty member's email
 * @param {string} comment - The comment to add
 */
function updateFacultyComment(email, comment) {
    try {
        const userEmail = Session.getActiveUser().getEmail();
        const role = getUserRole(userEmail);
        if (role !== 'Chair' && role !== 'Dean' && role !== 'Super Admin') return false;
        const safeEmail = email.replace(/\./g, ',');
        const response = UrlFetchApp.fetch(`${BASE_URL}/workloads/${safeEmail}.json`, {
            method: 'PATCH',
            contentType: 'application/json',
            payload: JSON.stringify({ deanComment: comment })
        });
        return true;
    } catch (error) {
        console.error('Error updating faculty comment:', error);
        return false;
    }
}

/**
 * Updates a faculty member's additional comment
 * @param {string} email - The faculty member's email
 * @param {string} comment - The additional comment to add
 */
function updateFacultyAdditionalComment(email, comment) {
    try {
        const userEmail = Session.getActiveUser().getEmail();
        const role = getUserRole(userEmail);
        if (role !== 'Chair' && role !== 'Dean' && role !== 'Super Admin') return false;
        const safeEmail = email.replace(/\./g, ',');
        const response = UrlFetchApp.fetch(`${BASE_URL}/workloads/${safeEmail}.json`, {
            method: 'PATCH',
            contentType: 'application/json',
            payload: JSON.stringify({ additionalComment: comment })
        });
        return true;
    } catch (error) {
        console.error('Error updating faculty additional comment:', error);
        return false;
    }
}

/**
 * Gets workload data for all faculty under a dean/chair
 * @param {Array<string>} facultyEmails - Array of faculty emails
 * @returns {Array<Object>} Array of faculty workload data
 */
function getAllFacultyData(facultyEmails) {
    try {
        // Only allow if the current user is a chair or dean
        const userEmail = Session.getActiveUser().getEmail();
        const role = getUserRole(userEmail);
        if (role !== 'Chair' && role !== 'Dean' && role !== 'Super Admin') return [];
        const data = [];
        facultyEmails.forEach(email => {
            const facultyData = getFacultyWorkloadData(email);
            if (facultyData) {
                data.push({
                    name: getUserName(email),
                    email: email,
                    status: facultyData.status || 'Pending',
                    totalPoints: facultyData.totalPoints || 0,
                    deanComment: facultyData.deanComment || '',
                    additionalComment: facultyData.additionalComment || ''
                });
            }
        });
        return data;
    } catch (error) {
        console.error('Error getting all faculty data:', error);
        return [];
    }
}

/**
 * Gets a user's name from their email
 * @param {string} email - The user's email
 * @returns {string} The user's name
 */
function getUserName(email) {
    if (AUTHORIZED_USERS.deans[email]) return AUTHORIZED_USERS.deans[email].name;
    if (AUTHORIZED_USERS.chairs[email]) return AUTHORIZED_USERS.chairs[email].name;
    return email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Returns the current semester in the format 'YYYY-1' or 'YYYY-2'
 */
function getCurrentSemester() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // JS months are 0-based
  // Assume Semester 1: Aug-Dec (8-12), Semester 2: Jan-Jul (1-7)
  if (month >= 8 && month <= 12) {
    return `${year}-1`;
  } else {
    return `${year}-2`;
  }
}

// Function to check if a user is authorized
function isUserAuthorized(email) {
    console.log('Checking authorization for:', email);
    const isFaculty = AUTHORIZED_USERS.faculty.includes(email);
    const isDean = AUTHORIZED_USERS.deans[email];
    const isChair = AUTHORIZED_USERS.chairs[email];
    const isSuperAdmin = email === AUTHORIZED_USERS.superAdmin;
    
    console.log('Authorization check results:', {
        isFaculty,
        isDean,
        isChair,
        isSuperAdmin
    });
    
    return isFaculty || isDean || isChair || isSuperAdmin;
}


// Deletes the entire workload record for a given semester (recordId encodes email + semester)
function deleteWorkloadSubmission(recordId, period) {
  try {
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`);
    const record = JSON.parse(response.getContentText());
    
    if (!record) {
      return { success: false, message: 'Record not found' };
    }

    UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`, {
      method: 'delete'
    });
    return { success: true, message: 'Submission deleted successfully' };
  } catch (error) {
    console.error('Error in deleteWorkloadSubmission:', error);
    return { success: false, message: error.message };
  }
}

// function initializeApp() {
//     console.log('Initializing app...');
//     google.script.run
//         .withSuccessHandler(email => {
//             console.log('Got user email:', email);
//             userEmail = email;
//             google.script.run
//                 .withSuccessHandler(isAuthorized => {
//                     console.log('Authorization check result:', isAuthorized);
//                     if (!isAuthorized) {
//                         showUnauthorizedMessage();
//                         return;
//                     }
//                     google.script.run
//                         .withSuccessHandler(role => {
//                             console.log('Got user role:', role);
//                             if (role === 'Dean') {
//                                 showDeanDashboard();
//                             } else if (role === 'Chair') {
//                                 showChairDashboard();
//                             } else {
//                                 fetchUserRecords();
//                             }
//                         })
//                         .getUserRole(email);
//                 })
//                 .isUserAuthorized(email);
//         })
//         .getCurrentUserEmail();
// }

function showChairDashboard() {
    $('#dashboard').hide();
    $('#submissionFormContainer').hide();
    $('#unauthorized').hide();
    
    // Load the chair dashboard
    google.script.run
        .withSuccessHandler(html => {
            $('#chairDashboard').html(html).show();
            // Load faculty submissions
            loadFacultySubmissions();
        })
        .getChairDashboardHtml();
}

function loadFacultySubmissions() {
    google.script.run
        .withSuccessHandler(facultyData => {
            const table = $('#facultySubmissionsTable tbody');
            table.empty();
            
            if (facultyData.length === 0) {
                table.append('<tr><td colspan="6" class="text-center">No faculty submissions found</td></tr>');
                return;
            }
            
            facultyData.forEach(faculty => {
                const tr = $('<tr>');
                tr.append($('<td>').text(faculty.name));
                tr.append($('<td>').text(faculty.email));
                tr.append($('<td>').text(faculty.status));
                tr.append($('<td>').text(faculty.totalPoints));
                tr.append($('<td>').text(faculty.deanComment || ''));
                tr.append($('<td>').text(faculty.additionalComment || ''));
                table.append(tr);
            });
        })
        .getAllFacultyData(getFacultyUnderUser(userEmail));
}

function getChairDashboardHtml() {
    const userEmail = Session.getActiveUser().getEmail();
    if (!isUserAuthorized(userEmail)) return '<div class="alert alert-danger">Unauthorized</div>';
    // Return a simple HTML section for chair dashboard instead of loading chair_profile.html
    return '<div id="chairDashboardContent"><h3>Chair Dashboard</h3><div id="facultySubmissionsTableSection"></div></div>';
}

/**
 * Approves the most recent submission for a faculty member (used by Chair)
 */
function approveFacultySubmission(email) {
  try {
    if (!isUserAuthorized(Session.getActiveUser().getEmail())) return false;
    const safeEmail = email.replace(/\./g, ',');
    // Find the most recent record for this faculty
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
    const data = JSON.parse(response.getContentText());
    if (!data) return false;
    // Find the latest record for this faculty
    const records = Object.entries(data)
      .filter(([key]) => key.startsWith(safeEmail + '_'))
      .sort((a, b) => b[0].localeCompare(a[0]));
    if (records.length === 0) return false;
    const [recordId, record] = records[0];
    // Approve both start and end if present
    if (record.start && Array.isArray(record.start)) {
      record.start.forEach(entry => entry.status = 'Approved');
    }
    if (record.end && Array.isArray(record.end)) {
      record.end.forEach(entry => entry.status = 'Approved');
    }
    // Update in Firebase
    UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`, {
      method: 'PUT',
      contentType: 'application/json',
      payload: JSON.stringify(record)
    });
    return true;
  } catch (error) {
    console.error('Error in approveFacultySubmission:', error);
    return false;
  }
}

/**
 * Rejects (deletes) the most recent submission for a faculty member (used by Chair)
 */
function rejectFacultySubmission(email) {
  try {
    if (!isUserAuthorized(Session.getActiveUser().getEmail())) return false;
    const safeEmail = email.replace(/\./g, ',');
    // Find the most recent record for this faculty
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
    const data = JSON.parse(response.getContentText());
    if (!data) return false;
    // Find the latest record for this faculty
    const records = Object.entries(data)
      .filter(([key]) => key.startsWith(safeEmail + '_'))
      .sort((a, b) => b[0].localeCompare(a[0]));
    if (records.length === 0) return false;
    const [recordId] = records[0];
    // Delete the record from Firebase
    UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`, {
      method: 'delete'
    });
    return true;
  } catch (error) {
    console.error('Error in rejectFacultySubmission:', error);
    return false;
  }
}

/**
 * Gets the latest workload data for a chair (for deans to review)
 * @param {string} chairEmail - The chair's email
 * @returns {Object|null} The latest workload record for the chair
 */
function getChairWorkloadData(chairEmail) {
    try {
        if (!isUserAuthorized(chairEmail)) return null;
        const safeEmail = chairEmail.replace(/\./g, ',');
        const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
        const data = JSON.parse(response.getContentText());
        if (!data) return null;
        // Find the latest record for this chair
        const records = Object.entries(data)
            .filter(([key]) => key.startsWith(safeEmail + '_'))
            .sort((a, b) => b[0].localeCompare(a[0]));
        if (records.length === 0) return null;
        const [recordId, record] = records[0];
        // Attach recordId for later use
        record.recordId = recordId;
        return record;
    } catch (error) {
        console.error('Error getting chair workload data:', error);
        return null;
    }
}

/**
 * Approves the most recent submission for a chair (used by Dean)
 */
function approveChairSubmission(chairEmail) {
    try {
        if (!isUserAuthorized(Session.getActiveUser().getEmail())) return false;
        const safeEmail = chairEmail.replace(/\./g, ',');
        const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
        const data = JSON.parse(response.getContentText());
        if (!data) return false;
        // Find the latest record for this chair
        const records = Object.entries(data)
            .filter(([key]) => key.startsWith(safeEmail + '_'))
            .sort((a, b) => b[0].localeCompare(a[0]));
        if (records.length === 0) return false;
        const [recordId, record] = records[0];
        // Approve both start and end if present
        if (record.start && Array.isArray(record.start)) {
            record.start.forEach(entry => entry.status = 'Approved');
        }
        if (record.end && Array.isArray(record.end)) {
            record.end.forEach(entry => entry.status = 'Approved');
        }
        // Update in Firebase
        UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`, {
            method: 'PUT',
            contentType: 'application/json',
            payload: JSON.stringify(record)
        });
        return true;
    } catch (error) {
        console.error('Error in approveChairSubmission:', error);
        return false;
    }
}

/**
 * Rejects (deletes) the most recent submission for a chair (used by Dean)
 */
function rejectChairSubmission(chairEmail) {
    try {
        if (!isUserAuthorized(Session.getActiveUser().getEmail())) return false;
        const safeEmail = chairEmail.replace(/\./g, ',');
        const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
        const data = JSON.parse(response.getContentText());
        if (!data) return false;
        // Find the latest record for this chair
        const records = Object.entries(data)
            .filter(([key]) => key.startsWith(safeEmail + '_'))
            .sort((a, b) => b[0].localeCompare(a[0]));
        if (records.length === 0) return false;
        const [recordId] = records[0];
        // Delete the record from Firebase
        UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`, {
            method: 'delete'
        });
        return true;
    } catch (error) {
        console.error('Error in rejectChairSubmission:', error);
        return false;
    }
}

function saveChairCommentRecommendation(email, semester, period, comment, recommendation, status) {
  try {
    const safeEmail = email.replace(/\./g, ',');
    const recordId = `${safeEmail}_${semester}`;
    const record = getWorkloadRecord(recordId);
    if (!record) {
      return { success: false, message: 'Record not found' };
    }
    // Update status for all entries in the selected period
    if (record[period] && Array.isArray(record[period])) {
      record[period].forEach(entry => {
        entry.status = status === 'Approved' ? 'approved' : status === 'Denied' ? 'rejected' : status;
      });
    }
    // Store comments and recommendations under the correct keys
    if (!record.comments) record.comments = {};
    if (!record.comments[semester]) record.comments[semester] = {};
    if (!record.comments[semester][period]) record.comments[semester][period] = {};
    record.comments[semester][period].comment = comment;
    record.comments[semester][period].recommendation = recommendation;
    record.comments[semester][period].status = status === 'Approved' ? 'approved' : status === 'Denied' ? 'rejected' : status;
    // Save back to Firebase
    UrlFetchApp.fetch(`${BASE_URL}/workloads/${recordId}.json`, {
      method: 'PUT',
      contentType: 'application/json',
      payload: JSON.stringify(record)
    });
    return { success: true };
  } catch (error) {
    console.error('Error in saveChairCommentRecommendation:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Gets all submissions for a given faculty code (FMSS, FEA, FHS, RLC, FST)
 * @param {string} facultyCode
 * @returns {Array<Object>} Array of submissions
 */
function getSubmissionsByFacultyCode(facultyCode) {
  try {
    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
    const data = JSON.parse(response.getContentText());
    if (!data) return [];
    // List of emails for this faculty
    const facultyEmails = getFacultyEmailsByFacultyCode(facultyCode);
    // Filter records for these emails
    return Object.entries(data)
      .filter(([key, value]) => facultyEmails.includes(value.email))
      .map(([key, value]) => ({ id: key, ...value }))
      .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
  } catch (error) {
    console.error('Error in getSubmissionsByFacultyCode:', error);
    return [];
  }
}

/**
 * Gets all emails for a given faculty code
 * @param {string} facultyCode
 * @returns {Array<string>}
 */
function getFacultyEmailsByFacultyCode(facultyCode) {
  return (typeof AUTHORIZED_USERS !== 'undefined' && AUTHORIZED_USERS.facultyMap && AUTHORIZED_USERS.facultyMap[facultyCode]) ? AUTHORIZED_USERS.facultyMap[facultyCode] : [];
}

/**
 * Gets all submissions for a dean's faculty (including both chairs and faculty)
 * @param {string} deanEmail
 * @returns {Array<Object>} Array of submissions
 */
function getAllSubmissionsForDean(deanEmail) {
    // Special case for senriquez@ub.edu.bz to see all submissions
    if (deanEmail === 'senriquez@ub.edu.bz') {
        try {
            const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
            const data = JSON.parse(response.getContentText());
            if (!data) return [];
            // Return all submissions sorted by last updated
            return Object.entries(data)
                .map(([key, value]) => ({ id: key, ...value }))
                .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        } catch (error) {
            console.error('Error in getAllSubmissionsForDean:', error);
            return [];
        }
    }

    // Regular dean access logic
    const facultyCodes = (typeof AUTHORIZED_USERS !== 'undefined' && AUTHORIZED_USERS.deanFacultyMap) ? AUTHORIZED_USERS.deanFacultyMap[deanEmail] : null;
    if (!facultyCodes) return [];
    if (Array.isArray(facultyCodes)) {
        // If mapped to multiple faculties, combine all submissions
        let all = [];
        facultyCodes.forEach(code => {
            all = all.concat(getSubmissionsByFacultyCode(code));
        });
        return all;
    } else {
        return getSubmissionsByFacultyCode(facultyCodes);
    }
}

/**
 * Gets all submissions for a faculty's department
 * @param {string} facultyEmail
 * @returns {Array<Object>} Array of submissions
 */
function getSubmissionsForFacultyDepartment(facultyEmail) {
  // Find which faculty code this email belongs to
  const codes = ['FEA','FMSS','FST','FHS','RLC'];
  let foundCode = null;
  for (let code of codes) {
    if (getFacultyEmailsByFacultyCode(code).includes(facultyEmail)) {
      foundCode = code;
      break;
    }
  }
  if (!foundCode) return [];
  return getSubmissionsByFacultyCode(foundCode);
}

/**
 * Checks if user is authorized to view reports
 * @param {string} email - User email
 * @returns {boolean} True if authorized
 */
function isReportAuthorized(email) {
  return email === 'senriquez@ub.edu.bz' || email === 'chimezirim.amagwula@ub.edu.bz';
}

/**
 * Gets submission statistics by department and status
 * @returns {Object} Report data with department breakdowns
 */
function getSubmissionReport() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    if (!isReportAuthorized(userEmail)) {
      return { success: false, message: 'Unauthorized' };
    }

    const response = UrlFetchApp.fetch(`${BASE_URL}/workloads.json`);
    const data = JSON.parse(response.getContentText());
    
    if (!data) {
      return { success: true, data: {} };
    }

    const report = {
      byDepartment: {},
      byFaculty: {},
      totals: {
        submitted: 0,
        reviewed: 0,
        approved: 0,
        pending: 0
      }
    };

    // Process each workload record - count each faculty member only once
    const processedFaculty = new Set();
    
    Object.entries(data).forEach(([recordId, record]) => {
      if (!record.email) return;
      
      const email = record.email;
      
      // Skip if we've already processed this faculty member
      if (processedFaculty.has(email)) return;
      
      // Get faculty code from entries
      let facultyCode = null;
      let hasSubmission = false;
      let status = 'pending';
      
      // Check start entries
      if (record.start && Array.isArray(record.start) && record.start.length > 0) {
        hasSubmission = true;
        facultyCode = record.start[0].faculty || null;
        // Check status - if any entry is approved/rejected, use that
        const entryStatuses = record.start.map(e => e.status || 'pending');
        if (entryStatuses.includes('approved')) {
          status = 'approved';
        } else if (entryStatuses.includes('rejected')) {
          status = 'rejected';
        } else if (entryStatuses.includes('reviewed')) {
          status = 'reviewed';
        }
      }
      
      // Check end entries
      if (record.end && Array.isArray(record.end) && record.end.length > 0) {
        hasSubmission = true;
        if (!facultyCode) {
          facultyCode = record.end[0].faculty || null;
        }
        // Update status if end has higher priority
        const entryStatuses = record.end.map(e => e.status || 'pending');
        if (entryStatuses.includes('approved')) {
          status = 'approved';
        } else if (entryStatuses.includes('rejected') && status !== 'approved') {
          status = 'rejected';
        } else if (entryStatuses.includes('reviewed') && status === 'pending') {
          status = 'reviewed';
        }
      }

      if (!hasSubmission || !facultyCode) return;

      // Mark this faculty as processed
      processedFaculty.add(email);

      // Initialize department if not exists
      if (!report.byDepartment[facultyCode]) {
        report.byDepartment[facultyCode] = {
          submitted: 0,
          reviewed: 0,
          approved: 0,
          pending: 0,
          faculty: []
        };
      }

      // Initialize faculty member
      report.byFaculty[email] = {
        email: email,
        department: facultyCode,
        submitted: true,
        reviewed: false,
        approved: false,
        pending: false
      };

      // Update counts - count each faculty only once
      report.byDepartment[facultyCode].submitted++;
      report.totals.submitted++;

      if (status === 'reviewed') {
        report.byDepartment[facultyCode].reviewed++;
        report.totals.reviewed++;
        report.byFaculty[email].reviewed = true;
      } else if (status === 'approved') {
        report.byDepartment[facultyCode].approved++;
        report.totals.approved++;
        report.byFaculty[email].approved = true;
      } else {
        report.byDepartment[facultyCode].pending++;
        report.totals.pending++;
        report.byFaculty[email].pending = true;
      }

      // Add to department faculty list
      report.byDepartment[facultyCode].faculty.push(email);
    });

    return { success: true, data: report };
  } catch (error) {
    console.error('Error in getSubmissionReport:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Generates Excel-compatible CSV file for submission report
 * @returns {Object} File data with CSV content
 */
function generateSubmissionReportExcel() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    if (!isReportAuthorized(userEmail)) {
      return { success: false, message: 'Unauthorized' };
    }

    const reportResult = getSubmissionReport();
    if (!reportResult.success) {
      return reportResult;
    }

    const report = reportResult.data;
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm-ss');
    
    // Create CSV content
    let csvContent = 'Submission Report - ' + timestamp + '\n\n';
    
    // Summary by Department
    csvContent += 'Summary by Department\n';
    csvContent += 'Department,Submitted,Reviewed,Approved,Pending\n';
    
    Object.entries(report.byDepartment).forEach(([dept, data]) => {
      csvContent += `${dept},${data.submitted},${data.reviewed},${data.approved},${data.pending}\n`;
    });
    
    csvContent += `TOTAL,${report.totals.submitted},${report.totals.reviewed},${report.totals.approved},${report.totals.pending}\n\n`;
    
    // Faculty Details
    csvContent += 'Faculty Details\n';
    csvContent += 'Email,Department,Submitted,Reviewed,Approved,Pending\n';
    
    Object.values(report.byFaculty).forEach(faculty => {
      csvContent += `${faculty.email},${faculty.department},${faculty.submitted ? 'Yes' : 'No'},${faculty.reviewed ? 'Yes' : 'No'},${faculty.approved ? 'Yes' : 'No'},${faculty.pending ? 'Yes' : 'No'}\n`;
    });

    return {
      success: true,
      filename: `Submission_Report_${timestamp}.csv`,
      mimeType: 'text/csv',
      content: csvContent
    };
  } catch (error) {
    console.error('Error in generateSubmissionReportExcel:', error);
    return { success: false, message: error.message };
  }
}
