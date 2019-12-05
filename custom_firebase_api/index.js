// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({credential: admin.credential.applicationDefault()});
const firestore = admin.firestore();
const cors = require("cors")({origin: true});

exports.easyScores = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        firestore.collection("easy").orderBy("time").orderBy("name").limit(10).get().then(snapshot => {
            if (snapshot.empty) {
                return res.status(200).json({easy: []});
            }
            var scores = [];
            snapshot.forEach(doc => {
                console.log(doc.data().name + ": " + doc.data().time);
                scores.push({name: doc.data().name, time:doc.data().time});
            });
            return res.status(200).json({easy: scores});
        }).catch(reason => {
            res.send(reason);
        });
    });
});

exports.mediumScores = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        firestore.collection("medium").orderBy("time").orderBy("name").limit(10).get().then(snapshot => {
            if (snapshot.empty) {
                return res.status(200).json({medium: []});
            }
            var scores = [];
            snapshot.forEach(doc => {
                scores.push({name: doc.data().name, time:doc.data().time});
            });
            return res.status(200).json({medium: scores});
        }).catch(reason => {
            res.send(reason);
        });
    });
});

exports.hardScores = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        firestore.collection("hard").orderBy("time").orderBy("name").limit(10).get().then(snapshot => {
            if (snapshot.empty) {
                return res.status(200).json({hard: []});
            }
            var scores = [];
            snapshot.forEach(doc => {
                scores.push({name: doc.data().name, time: doc.data().time});
            });
            return res.status(200).json({hard: scores});
        }).catch(reason => {
            res.send(reason);
        });
    });
});

exports.insertScore = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        const stamp = new Date();
        var data = {
            name: req.body.name,
            time: req.body.time
        };
        firestore.collection(req.body.difficulty).doc(stamp.toString()).set(data).then(docRef => {
            return res.status(201).json({message: "Created!", id: stamp});
        }).catch(reason => {
            res.send(reason);
        });
    });
});
