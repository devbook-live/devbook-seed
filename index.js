const { db } = require('./firebase/initFirebase');
const fs = require('fs');

const contents = fs.readFileSync('./firestoreData.json');
const data = JSON.parse(contents);

//const data = {
//  groups: {
//    SarahLearningTeam: {
//      users: {
//        Jang: { exists: true },
//        Connor: { exists: true },
//        Ben: { exists: true },
//        Fred: { exists: true },
//        Sarah: { exists: true }
//      },
//    },
//  },
//  users: {
//    Jang: {
//      groups: {
//        SarahLearningTeam: { exists: true }
//      }
//    },
//    Connor: {
//      groups: {
//        SarahLearningTeam: { exists: true }
//      }
//    },
//    Ben: {
//      groups: {
//        SarahLearningTeam: { exists: true }
//      }
//    },
//    Fred: {
//      groups: {
//        SarahLearningTeam: { exists: true }
//      }
//    },
//    Sarah: {
//      groups: {
//        SarahLearningTeam: { exists: true }
//      }
//    }
//  }
//};

// notebooks -> docId -> users -> subDocId -> { exists: true }
// const data = {
//   notebooks: {
//     grizzlybear: {
//       users: {
//         chicken: {
//           exists: true
//         }
//       },
//       snippets: {
//         1: {
//           rooster: true
//         }
//       }
//     }
//   }
// }
//
// collection = notebooks
Object.keys(data).forEach(collection => {
  const collectObjs = data[collection];
  // docId = grizzlybear
  Object.keys(collectObjs).forEach(docId => {
    const subcollections = data[collection][docId];
    // subcollection = users
    Object.keys(subcollections).forEach(subcollection => {
      const subDocIds = data[collection][docId][subcollection];
      // subDocId = chicken
      Object.keys(subDocIds).forEach(subDocId => {
        const subDocObj = data[collection][docId][subcollection][subDocId];
        db.collection(collection)
          .doc(docId)
          .collection(subcollection)
          .doc(subDocId)
          .set(subDocObj)
          .then(() => {
              console.log(`db.collection(${collection}).doc(${docId}).collection(${subcollection}).doc(${subDocId}).set(${JSON.stringify(subDocObj)}) successfully written!`);
          })
          .catch((error) => {
              console.log(`Error writing db.collection(${collection}).doc(${docId}).collection(${subcollection}).doc(${subDocId}).set(${JSON.stringify(subDocObj)}): ${error}`);
          });
      });
    });
  });
});


